import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsInt,
  Min,
  IsPositive,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { FileCourseAssnDto } from './file-course-assn.dto';
import { LecturerCourseAssnDto } from './lecturer-course-assn.dto';
import { CampusDto } from '../../campus/dto/campus.dto';

export class ApplicationsCount {
  @ApiProperty({
    description: 'Number of applications for the course',
    type: Number,
  })
  application: number;
}

export class CourseOptionsDto {
  @ApiProperty({
    description: 'Unique ID of the course option',
    format: 'uuid',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  course_options_id: string;

  @ApiProperty({
    description: 'Start date of the course option',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: 'End date of the course option',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({ description: 'Price of the course option', default: 0 })
  @IsPositive()
  @IsNotEmpty()
  option_price: number;

  @ApiPropertyOptional({
    description: 'ID of the course this option belongs to',
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  course_id?: string;

  @ApiProperty({
    description: 'End date of the course option',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'End date of the course option',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}

export class CourseDto {
  @ApiProperty({ description: 'Unique ID of the course', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  course_id: string;

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

  @ApiProperty({ description: 'Published or not', type: Boolean })
  @IsBoolean()
  is_published: boolean;

  @ApiProperty({ description: 'Description in English' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({ description: 'language' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ description: 'URL id' })
  @IsString()
  @IsNotEmpty()
  url_id: string;

  @ApiProperty({
    description: 'Start date of the course',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: 'End date of the course',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @ApiPropertyOptional({
    description: 'Maximum number of students',
    default: 50,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  max_students: number = 50;

  @ApiPropertyOptional({ description: 'Price of the course', default: 0 })
  @IsPositive()
  @IsOptional()
  price: number = 0;

  @ApiPropertyOptional({ description: 'Price of the course', default: 0 })
  @IsPositive()
  @IsOptional()
  day_price: number = 0;

  @ApiPropertyOptional({ description: 'ID of the lecturer', format: 'uuid' })
  @IsUUID()
  @IsOptional()
  lecturer_id: string | null;

  @ApiPropertyOptional({ description: 'ID of the creator', format: 'uuid' })
  @IsUUID()
  @IsOptional()
  created_by: string | null;

  @ApiProperty({
    description: 'Date the course was created',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'Date the course was last updated',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  updated_at: Date;

  @ApiPropertyOptional({
    description: 'Apps count',
    type: ApplicationsCount,
  })
  @IsOptional()
  _count?: ApplicationsCount;

  @ApiProperty({
    description: 'Array of media associated with the course',
    type: [FileCourseAssnDto],
  })
  media_course_assn: FileCourseAssnDto[];

  @ApiProperty({
    description: 'Array of media associated with the course',
    type: [FileCourseAssnDto],
  })
  files_course_assn: FileCourseAssnDto[];

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

  @ApiProperty({
    description: 'Array of media associated with the course',
    type: [LecturerCourseAssnDto],
  })
  lecturer_course_assn?: LecturerCourseAssnDto[];

  @ApiProperty({
    description: 'Array of media associated with the course',
    type: CampusDto,
  })
  campuse?: CampusDto;

  @ApiPropertyOptional({
    description: 'List of course options',
    type: [CourseOptionsDto],
  })
  course_options?: CourseOptionsDto[];
}
