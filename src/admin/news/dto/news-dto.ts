import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { NewsMediaDto } from './news-media-dto';
import { MediaNewsAssnDto } from './media-news-assn.dto';

export class NewsDto {
  @ApiProperty({
    description: 'Unique ID of the news item',
    format: 'uuid',
  })
  @IsUUID()
  news_id: string;

  @ApiProperty()
  @IsString()
  title_ka: string;

  @ApiProperty()
  @IsString()
  title_en: string;

  @ApiProperty()
  @IsString()
  description_ka: string;

  @ApiProperty()
  @IsString()
  description_en: string;

  @ApiPropertyOptional({
    description: 'Creation timestamp (auto-filled by server if omitted)',
  })
  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @ApiPropertyOptional({
    description: 'Last update timestamp (auto-filled by server if omitted)',
  })
  @IsOptional()
  @IsDateString()
  updated_at?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hashtags?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  short_des_ka?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  short_des_en?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keywords_ka?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keywords_en?: string;

  @ApiPropertyOptional({
    description: 'List of media associated with the news item',
    type: [NewsMediaDto],
  })
  news_media?: NewsMediaDto[];

  @ApiProperty({
    description: 'List of media associated with the news item',
    type: [MediaNewsAssnDto],
  })
  news_media_assn: MediaNewsAssnDto[];
}
