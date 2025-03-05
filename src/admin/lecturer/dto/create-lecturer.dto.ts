import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLecturerDto {
  @ApiPropertyOptional({ type: String, description: 'Profile picture URL' })
  @IsOptional()
  @IsString()
  picture?: string | null;

  @ApiProperty({ type: String, description: 'First name in Georgian' })
  @IsString()
  first_name_ka: string;

  @ApiProperty({ type: String, description: 'Last name in Georgian' })
  @IsString()
  last_name_ka: string;

  @ApiProperty({ type: String, description: 'First name in English' })
  @IsString()
  first_name_en: string;

  @ApiProperty({ type: String, description: 'Last name in English' })
  @IsString()
  last_name_en: string;

  @ApiProperty({ type: String, description: 'Biography in Georgian' })
  @IsString()
  biography_ka: string;

  @ApiProperty({ type: String, description: 'Biography in English' })
  @IsString()
  biography_en: string;
}
