import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';

export class CreateCourseDto {
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

  @ApiProperty({
    description: 'Start date of the course',
    type: String,
  })
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    description: 'Is the course published?',
    type: Boolean,
  })
  @IsBoolean()
  is_published: boolean;

  @ApiProperty({
    description: 'End date of the course',
    type: String,
  })
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({
    description: 'Maximum number of students',
    default: 50,
  })
  @IsInt()
  @Min(0)
  max_students: number;

  @ApiProperty({ description: 'Price of the course', default: 0 })
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ description: 'Lecturer ID' })
  @IsString()
  @IsOptional()
  lecturer_id: string | null;

  @ApiPropertyOptional({
    description: 'List of lecturer IDs',
    type: [String],
  })
  lecturers?: string[];

  @ApiPropertyOptional({
    description: 'List of category IDs',
    type: String,
  })
  campus_id?: string;

  @ApiPropertyOptional({
    description: 'Course media',
    type: [FileDto],
  })
  @IsOptional()
  course_media?: FileDto[];

  @ApiPropertyOptional({
    description: 'Course files',
    type: [FileDto],
  })
  @IsOptional()
  course_files?: FileDto[];

  @ApiPropertyOptional({
    description: 'kewords ka',
    type: String,
  })
  keywords_ka?: string;

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
