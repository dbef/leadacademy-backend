import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRtDto } from './dto/auth-rt.dto';
import { SignInDto } from './dto/sign-in.dto';
import { GenerateNewAccessTokenDto } from './dto/generate-new-access-token.dto';
import { JwtAccessGuard } from './guards/jwt.guard';
import { GetUser } from '../decorators/user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign un',
  })
  @ApiOkResponse({
    description: 'User successfully registered',
    type: AuthRtDto,
  })
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign in',
  })
  @ApiOkResponse({
    description: 'User successfully signed in',
    type: AuthRtDto,
  })
  signIn(@Body() createAuthDto: SignInDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Generates new access token',
  })
  @ApiOkResponse({
    description: 'User token successfully refreshed',
    type: AuthRtDto,
  })
  generateAccessToken(@Body() data: GenerateNewAccessTokenDto) {
    return this.authService.refreshAccessToken(data);
  }

  @Get('me')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  me(@GetUser() user_id: string) {
    return this.authService.me(user_id);
  }
}
