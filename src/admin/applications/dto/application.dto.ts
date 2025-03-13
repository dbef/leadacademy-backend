import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';

export class ApplicationDto {
  @ApiProperty({
    description: 'Unique identifier for the application',
    format: 'uuid',
  })
  @IsUUID()
  application_id: string;

  @ApiProperty({
    description: 'Unique identifier for the course',
    format: 'uuid',
  })
  @IsUUID()
  course_id: string;

  @ApiProperty({ description: 'Application status', default: 'pending' })
  @IsString()
  @IsOptional()
  status?: string;

  // Parent Information
  @ApiProperty({ description: 'Parent First Name' })
  @IsString()
  parent_name: string;

  @ApiProperty({ description: 'Parent Last Name' })
  @IsString()
  parent_lastname: string;

  @ApiProperty({ description: 'Parent Personal Number' })
  @IsString()
  parent_pn: string;

  @ApiProperty({ description: 'Parent Email' })
  @IsEmail()
  parent_email: string;

  @ApiProperty({ description: 'Parent Phone Number' })
  @IsString()
  parent_phone: string;

  @ApiProperty({ description: 'Relationship to Student', default: 'parent' })
  @IsString()
  @IsOptional()
  relation?: string;

  @ApiProperty({ description: 'Parent Date of Birth' })
  @IsString()
  parent_dob: string;

  @ApiProperty({ description: 'Parent Gender' })
  @IsString()
  parent_gender: string;

  @ApiProperty({ description: 'Parent Nationality' })
  @IsString()
  parent_nationality: string;

  @ApiProperty({ description: 'Country of Residence' })
  @IsString()
  parent_country: string;

  @ApiProperty({ description: 'Home Address' })
  @IsString()
  parent_address: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  parent_city: string;

  // Student Information
  @ApiProperty({ description: 'Student First Name' })
  @IsString()
  student_name: string;

  @ApiProperty({ description: 'Student Last Name' })
  @IsString()
  student_lastname: string;

  @ApiProperty({ description: 'Student Personal Number' })
  @IsString()
  student_pn: string;

  @ApiProperty({ description: 'Student Email' })
  @IsEmail()
  student_email: string;

  @ApiProperty({ description: 'Student Phone Number' })
  @IsString()
  student_phone: string;

  @ApiProperty({ description: 'Student Class' })
  @IsString()
  student_class: string;

  @ApiProperty({ description: 'Student Date of Birth' })
  @IsString()
  student_dob: string;

  @ApiProperty({ description: 'Student Gender' })
  @IsString()
  student_gender: string;

  @ApiProperty({ description: 'Educational Program' })
  @IsString()
  program: string;

  @ApiPropertyOptional({ description: 'Potential Roommate', required: false })
  @IsOptional()
  @IsString()
  potential_roommate?: string | null;

  // Medical Information
  @ApiPropertyOptional({ description: 'Allergens', required: false })
  @IsOptional()
  @IsString()
  alergens?: string | null;

  @ApiPropertyOptional({ description: 'Medications', required: false })
  @IsOptional()
  @IsString()
  medicaments?: string | null;

  @ApiPropertyOptional({ description: 'Dietary Restrictions', required: false })
  @IsOptional()
  @IsString()
  diet_restrictions?: string | null;

  @ApiPropertyOptional({
    description: 'Physical Disabilities',
    required: false,
  })
  @IsOptional()
  @IsString()
  physical_disabilities?: string | null;

  @ApiPropertyOptional({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  additional_info?: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  special_needs: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  relationship_with_peers: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  social_skills: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergency_relation: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergency_contact_name: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergency_contact_phone: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  additional_comfort_info: string | null;

  @ApiProperty({ description: 'Medical Terms Agreement' })
  @IsBoolean()
  medical_terms: boolean;

  @ApiProperty({ description: 'Terms and Conditions Agreement' })
  @IsBoolean()
  terms_and_conditions: boolean;

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
