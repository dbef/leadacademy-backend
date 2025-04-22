import { ApiProperty } from '@nestjs/swagger';

export class CreatedApplicationDto {
  @ApiProperty({
    description: 'The id of the application',
    example: '1234567890abcdef12345678',
    type: String,
  })
  application_id: string;
}
