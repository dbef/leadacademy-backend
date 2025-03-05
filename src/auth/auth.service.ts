import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRtDto } from './dto/auth-rt.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as argon2 from 'argon2';
import { GenerateNewAccessTokenDto } from './dto/generate-new-access-token.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<AuthRtDto> {
    const newUser = await this.usersService.create(createAuthDto);

    if (!newUser) {
      throw new BadRequestException('Can not create user');
    }

    const tokens = await this.getTokens(newUser.id);

    return {
      user: newUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async signIn(data: SignInDto): Promise<AuthRtDto> {
    const user = await this.usersService.findUserByEmail(data.email);

    if (!user) throw new UnauthorizedException('Unauthorized');

    const passwordMatches = await argon2.verify(user.password, data.password);

    if (!passwordMatches) throw new UnauthorizedException('Unauthorized');
    const tokens = await this.getTokens(user.id);

    return {
      user: user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          user_id: userId,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1m',
        },
      ),
      this.jwtService.signAsync(
        {
          user_id: userId,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(
    data: GenerateNewAccessTokenDto,
  ): Promise<AuthRtDto> {
    const { refreshToken } = data;

    let userId: string;
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      userId = payload.user_id;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.getTokens(userId);

    return {
      user: user,
      accessToken: tokens.accessToken,
      refreshToken,
    };
  }

  async me(userId: string): Promise<UserDto> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    delete user.password;

    return user;
  }
}
