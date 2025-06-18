import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { CreateCourseOptionDto } from './create-course.dto';

export class EditCourseDto {
  @ApiPropertyOptional({ description: 'Title in Georgian' })
  @IsString()
  @IsOptional()
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

  @ApiPropertyOptional({ description: 'language' })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional({
    description: 'Start date of the course',
    type: String,
  })
  @IsString()
  @IsOptional()
  start_date?: string;

  @ApiPropertyOptional({
    description: 'End date of the course',
    type: String,
  })
  @IsString()
  @IsOptional()
  end_date?: string;

  @ApiPropertyOptional({
    description: 'Maximum number of students',
    default: 50,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  max_students?: number;

  @ApiPropertyOptional({ description: 'Price of the course', default: 0 })
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: 'Day Price of the course', default: 0 })
  @IsPositive()
  @IsOptional()
  day_price?: number;

  @ApiPropertyOptional({ description: 'Lecturer ID' })
  @IsString()
  @IsOptional()
  lecturer_id?: string | null;

  @ApiPropertyOptional({ description: 'Course media', type: Boolean })
  @IsBoolean()
  is_published: boolean;

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
    description: 'Course options',
    type: [CreateCourseOptionDto],
    required: false,
  })
  @IsOptional()
  course_options?: CreateCourseOptionDto[];
}
