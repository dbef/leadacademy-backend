import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class LecturerDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  picture?: string;

  @ApiProperty()
  @IsString()
  first_name_ka: string;

  @ApiProperty()
  @IsString()
  last_name_ka: string;

  @ApiProperty()
  @IsString()
  first_name_en: string;

  @ApiProperty()
  @IsString()
  last_name_en: string;

  @ApiProperty()
  @IsString()
  biography_ka: string;

  @ApiProperty()
  @IsString()
  biography_en: string;

  @ApiProperty({
    type: String
  })
  @IsString()
  created_at: Date;

  @ApiProperty({
    type: String
  })
  @IsString()
  updated_at: Date;
}
