import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';

export class UpdateNewsDto {
  @ApiPropertyOptional({ description: 'Title in Georgian' })
  @IsOptional()
  @IsString()
  title_ka?: string;

  @ApiPropertyOptional({ description: 'Title in English' })
  @IsString()
  @IsOptional()
  title_en?: string;

  @ApiPropertyOptional({ description: 'Description in Georgian' })
  @IsString()
  @IsOptional()
  description_ka?: string;

  @ApiPropertyOptional({ description: 'Description in English' })
  @IsString()
  @IsOptional()
  description_en?: string;

  @ApiPropertyOptional({
    description: 'Course media',
    type: [FileDto],
  })
  @IsOptional()
  news_media?: FileDto[];

  @ApiPropertyOptional({
    description: 'kewords ka',
    type: String,
  })
  keywords_ka?: string;

  @ApiPropertyOptional({
    description: 'kewords ka',
    type: String,
  })
  hash_tags?: string;

  @ApiPropertyOptional({
    description: 'kewords ka',
    type: String,
  })
  keywords_en?: string;

  @ApiPropertyOptional({
    description: 'kewords ka',
    type: String,
  })
  short_des_en?: string;

  @ApiPropertyOptional({
    description: 'kewords ka',
    type: String,
  })
  short_des_ka?: string;
}
