import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
} from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Unique identifier for the course',
    format: 'uuid',
  })
  @IsUUID()
  course_id: string;

  @ApiProperty({ description: "Parent's first name" })
  @IsString()
  @IsNotEmpty()
  parent_name: string;

  @ApiProperty({ description: "Parent's last name" })
  @IsString()
  @IsNotEmpty()
  parent_lastname: string;

  @ApiProperty({ description: "Parent's personal number" })
  @IsString()
  @IsNotEmpty()
  parent_pn: string;

  @ApiProperty({ description: "Parent's email address", format: 'email' })
  @IsEmail()
  parent_email: string;

  @ApiProperty({ description: "Parent's phone number" })
  @IsString()
  @IsNotEmpty()
  parent_phone: string;

  @ApiProperty({ description: 'Relation to the child', default: 'parent' })
  @IsString()
  relation: string;

  @ApiProperty({ description: "Child's first name" })
  @IsString()
  @IsNotEmpty()
  child_name: string;

  @ApiProperty({ description: "Child's last name" })
  @IsString()
  @IsNotEmpty()
  child_lastname: string;

  @ApiPropertyOptional({
    description: "Child's email address",
    format: 'email',
  })
  @IsEmail()
  @IsOptional()
  child_email?: string | null;

  @ApiProperty({ description: "Child's date of birth" })
  @IsString()
  child_dob: string;
}
