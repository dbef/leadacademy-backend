import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthRtDto {
  @ApiProperty({
    description: 'The user',
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'access token',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: 'refresh token',
    type: String,
  })
  refreshToken: string;
}
