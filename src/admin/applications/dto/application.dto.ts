import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
} from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';

export class ApplicationDto {
  @ApiProperty({ description: 'Unique application ID', format: 'uuid' })
  @IsUUID()
  application_id: string;

  @ApiProperty({ description: 'Course ID' })
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty({ description: 'Application status', default: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Parent first name' })
  @IsString()
  @IsNotEmpty()
  parent_name: string;

  @ApiProperty({ description: 'Parent last name' })
  @IsString()
  @IsNotEmpty()
  parent_lastname: string;

  @ApiProperty({ description: 'Parent personal number' })
  @IsString()
  @IsNotEmpty()
  parent_pn: string;

  @ApiProperty({ description: 'Parent email' })
  @IsEmail()
  @IsNotEmpty()
  parent_email: string;

  @ApiProperty({ description: 'Parent phone number' })
  @IsString()
  @IsNotEmpty()
  parent_phone: string;

  @ApiProperty({ description: 'Relation to the child', default: 'parent' })
  @IsString()
  relation: string;

  @ApiProperty({ description: 'Child first name' })
  @IsString()
  @IsNotEmpty()
  child_name: string;

  @ApiProperty({ description: 'Child last name' })
  @IsString()
  @IsNotEmpty()
  child_lastname: string;

  @ApiPropertyOptional({ description: 'Child email' })
  @IsEmail()
  @IsOptional()
  child_email?: string;

  @ApiProperty({
    description: 'Child date of birth',
    type: String,
  })
  @IsNotEmpty()
  child_dob: Date;

  @ApiProperty({
    description: 'Child date of birth',
    type: String,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Child date of birth',
    type: String,
  })
  updated_at: Date;

  @ApiPropertyOptional({ description: 'Course', type: CourseDto })
  course?: CourseDto;
}
