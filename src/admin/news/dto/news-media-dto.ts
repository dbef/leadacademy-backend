import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsInt,
  Min,
  IsUUID,
} from 'class-validator';

export class NewsMediaDto {
  @ApiProperty({ description: 'Unique ID of the course media', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  news_media_id: string;

  @ApiProperty({ description: 'ID of the associated course', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  news_id: string;

  @ApiProperty({ description: 'URL of the media file' })
  @IsString()
  @IsNotEmpty()
  media_url: string;

  @ApiProperty({ description: 'Original name of the media file' })
  @IsString()
  @IsNotEmpty()
  original_name: string;

  @ApiProperty({ description: 'Location of the media file' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Type of the media file' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Position of the media file' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  position: number;

  @ApiProperty({
    description: 'Date the media was created',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'Date the media was last updated',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}
