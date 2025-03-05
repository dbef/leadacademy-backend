import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthRt } from './dto/admin-auth-rt.dto';
import { GenerateNewAdminAccessTokenDto } from './dto/generate-new-admin-access-token.dto';
import { JwtAdminAccessGuard } from './guards/admin.guard';
import { GetAdmin } from './decorators/admin.decorator';
import { AdminDto } from './dto/admin.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOperation({
    summary: 'ADMIN Sign in',
  })
  @ApiOkResponse({
    description: 'Admin successfully signed in',
    type: AdminAuthRt,
  })
  create(@Body() data: AdminSignInDto) {
    return this.adminService.signIn(data);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Generates new access token',
  })
  @ApiOkResponse({
    description: 'Admin token successfully refreshed',
    type: AdminAuthRt,
  })
  findAll(@Body() data: GenerateNewAdminAccessTokenDto) {
    return this.adminService.refreshAccessToken(data);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAdminAccessGuard)
  @ApiOkResponse({
    description: 'Admin successfully signed in',
    type: AdminDto,
  })
  findOne(@GetAdmin() admin: string) {
    return this.adminService.me(admin);
  }
}
