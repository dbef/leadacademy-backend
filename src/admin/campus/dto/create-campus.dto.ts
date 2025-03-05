import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';

export class CreateCampusDto {
  @ApiProperty({ description: 'Title in Georgian' })
  @IsString()
  @IsNotEmpty()
  campus_name_ka: string;

  @ApiProperty({ description: 'Title in English' })
  @IsString()
  @IsNotEmpty()
  campus_name_en: string;

  @ApiProperty({ description: 'Description in Georgian' })
  @IsString()
  @IsNotEmpty()
  description_ka: string;

  @ApiProperty({ description: 'Description in English' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({
    description: 'Start date of the course',
    type: String,
  })
  @IsNotEmpty()
  maps_url: string;

  @ApiPropertyOptional({
    description: 'Course media',
    type: [FileDto],
  })
  @IsOptional()
  campus_media?: FileDto[];

  @ApiPropertyOptional({
    description: 'Course files',
    type: [FileDto],
  })
  @IsOptional()
  campus_files?: FileDto[];
}
