import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsArray, IsDate } from 'class-validator';
import { CampusFileAssnDto } from './campus-file-assn.dto';

export class CampusDto {
  @ApiProperty()
  @IsUUID()
  campus_id: string;

  @ApiProperty()
  @IsString()
  campus_name_ka: string;

  @ApiProperty()
  @IsString()
  campus_name_en: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  maps_url?: string;

  @ApiProperty()
  @IsString()
  description_ka: string;

  @ApiProperty()
  @IsString()
  description_en: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;

  @ApiPropertyOptional()
  campus_name_short?: string;

  @ApiProperty({ type: [CampusFileAssnDto] })
  @IsArray()
  campus_media_assn: CampusFileAssnDto[];

  @ApiProperty({ type: [CampusFileAssnDto] })
  @IsArray()
  campus_file_assn: CampusFileAssnDto[];
}
