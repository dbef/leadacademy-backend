import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminSignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
    description: 'The username of the admin',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'The password of the admin',
  })
  password: string;
}
