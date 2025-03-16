import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CoursesQuery {
  @ApiPropertyOptional({
    type: String,
    description: 'Location of the course',
  })
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Location of the course',
  })
  @IsOptional()
  season?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Location of the course',
  })
  @IsOptional()
  limit?: number;
}
