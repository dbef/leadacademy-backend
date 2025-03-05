import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  IsDate,
  IsUrl,
} from 'class-validator';
import { FolderDto } from './folder-dto';

export class FileDto {
  @ApiProperty({
    description: 'Unique identifier for the media',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  media_id: string;

  @ApiProperty({
    description: 'URL where the media is stored',
    example: 'https://example.com/media.jpg',
  })
  @IsUrl()
  media_url: string;

  @ApiProperty({
    description: 'Name of the media file',
    example: 'image.jpg',
  })
  @IsString()
  media_name: string;

  @ApiProperty({
    description: 'Location of the media',
    example: 'New York',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Type of the media',
    example: 'image',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Size of the media file',
    example: 123.45,
    default: 0,
  })
  @IsNumber()
  media_size: number;

  @ApiProperty({
    description: 'Creation date of the media',
    example: '2025-02-24T00:00:00.000Z',
    default: 'now',
    type: String,
  })
  @IsString()
  created_at: Date;

  @ApiProperty({
    description: 'Last updated date of the media',
    example: '2025-02-24T00:00:00.000Z',
    default: 'updatedAt',
    type: String,
  })
  @IsDate()
  updated_at: Date;

  @ApiPropertyOptional({
    description: 'Folder ID the media belongs to',
    example: 'abc123',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  folder_id?: string;

  @ApiProperty({
    description: 'Related folder information',
    required: false,
  })
  @IsOptional()
  folder?: FolderDto; // Assuming FolderDto is defined somewhere
}
