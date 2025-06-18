import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Unique identifier for the course',
    format: 'uuid',
  })
  @IsUUID()
  course_id: string;

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

  @ApiProperty({ description: 'Relationship to Student' })
  @IsString()
  relation: string;

  @ApiProperty({ description: 'Parent Date of Birth' })
  @IsString()
  parent_dob: string;

  @ApiProperty({ description: 'Parent Gender' })
  @IsString()
  parent_gender: string;

  @ApiProperty({ description: 'Parent Gender' })
  @IsString()
  student_gender: string;

  @ApiProperty({ description: 'Parent Nationality' })
  @IsString()
  nationality: string;

  @ApiProperty({ description: 'Country of Residence' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'Home Address' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Days attending' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  days_attending: number;

  // Student Info
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

  @ApiProperty({ description: 'Educational Program' })
  @IsString()
  program: string;

  @ApiProperty({ description: 'Potential Roommate' })
  @IsOptional()
  @IsString()
  potential_roommate: string | null;

  // Medical Info
  @ApiProperty({ description: 'Allergens' })
  @IsOptional()
  @IsString()
  alergens: string | null;

  @ApiProperty({ description: 'Medications' })
  @IsOptional()
  @IsString()
  medicaments: string | null;

  @ApiProperty({ description: 'Dietary Restrictions' })
  @IsOptional()
  @IsString()
  diet_restrictions: string | null;

  @ApiProperty({
    description: 'Physical Disabilities',
    required: false,
  })
  @IsOptional()
  @IsString()
  physical_disabilities: string | null;

  @ApiProperty({
    description: 'Additional Medical Information',
    required: false,
  })
  @IsOptional()
  @IsString()
  additional_info: string | null;

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
  @IsString()
  media_release: string;

  @ApiProperty({ description: 'Medical Terms Agreement' })
  @IsBoolean()
  medical_terms: boolean;

  @ApiProperty({ description: 'Terms and Conditions Agreement' })
  @IsBoolean()
  terms_and_conditions: boolean;

  @ApiProperty({
    description: 'Course Option ID',
    required: false,
    type: String,
  })
  @IsString()
  course_option_id: string;
}
