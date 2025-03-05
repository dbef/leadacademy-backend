import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminDto {
  @IsString()
  @ApiProperty({
    example: 'admin',
    description: 'The username of the admin',
  })
  username: string;
}
