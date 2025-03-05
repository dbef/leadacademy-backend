import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({
    description: 'The id of the user',
    type: String,
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  email: string;
}
