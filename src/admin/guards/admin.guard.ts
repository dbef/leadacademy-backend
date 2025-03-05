import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAdminAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Access token missing');
    }

    const accessToken = authHeader.replace('Bearer ', '');

    try {
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.ADMIN_JWT_ACCESS_SECRET,
      });

      request.user = decoded;

      const findAdmin = await this.prisma.admin.findUnique({
        where: {
          id: decoded.user_id,
        },
      });

      if (!findAdmin) {
        throw new UnauthorizedException('Invalid or expired access token');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
