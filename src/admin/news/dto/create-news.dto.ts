import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';

export class CreateNewsDto {
  @ApiProperty({ description: 'Title in Georgian' })
  @IsString()
  @IsNotEmpty()
  title_ka: string;

  @ApiProperty({ description: 'Title in English' })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({ description: 'Description in Georgian' })
  @IsString()
  @IsNotEmpty()
  description_ka: string;

  @ApiProperty({ description: 'Description in English' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

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
