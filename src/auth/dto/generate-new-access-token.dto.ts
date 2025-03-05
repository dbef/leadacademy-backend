import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateNewAccessTokenDto {
  @IsString()
  @ApiProperty({
    description: 'The refresh token of the user',
    type: String,
  })
  refreshToken: string;
}
