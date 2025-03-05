import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Access token missing');
    }

    const accessToken = authHeader.replace('Bearer ', '');

    try {
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET, // Or use ConfigService for better secret management
      });

      request.user = decoded;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
