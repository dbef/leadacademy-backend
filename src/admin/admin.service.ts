import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Admin } from '@prisma/client';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import * as argon2 from 'argon2';
import { AdminAuthRt } from './dto/admin-auth-rt.dto';
import { GenerateNewAdminAccessTokenDto } from './dto/generate-new-admin-access-token.dto';
import { AdminDto } from './dto/admin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async findAdminByUserName(username: string): Promise<Admin | null> {
    return this.prisma.admin.findFirst({
      where: {
        username: username,
      },
    });
  }

  async signIn(data: AdminSignInDto): Promise<AdminAuthRt> {
    const user = await this.findAdminByUserName(data.username);

    if (!user) throw new UnauthorizedException('Unauthorized');

    const passwordMatches = await argon2.verify(user.password, data.password);

    if (!passwordMatches) throw new UnauthorizedException('Unauthorized');
    const tokens = await this.getTokens(user.id);

    return {
      username: user.username,
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
          secret: this.configService.get<string>('ADMIN_JWT_ACCESS_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          user_id: userId,
        },
        {
          secret: this.configService.get<string>('ADMIN_JWT_REFRESH_SECRET'),
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
    data: GenerateNewAdminAccessTokenDto,
  ): Promise<AdminAuthRt> {
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

    const user = await this.prisma.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.getTokens(userId);

    return {
      username: user.username,
      accessToken: tokens.accessToken,
      refreshToken,
    };
  }

  async me(userId: string): Promise<AdminDto> {
    const user = await this.prisma.admin.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
