import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminAuthRt {
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'The username of the admin',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'accessToken',
    description: 'The accessToken of the admin',
  })
  accessToken: string;

  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'The refreshToken of the admin',
  })
  refreshToken: string;
}
