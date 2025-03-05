import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';

export class CampusFileAssnDto {
  @IsUUID()
  @IsString()
  @ApiProperty({
    type: String,
  })
  campus_media_assn_id: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    type: String,
  })
  media_id: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    type: String,
  })
  campus_id: string;

  @ApiPropertyOptional({
    type: FileDto,
  })
  media?: FileDto;
}
