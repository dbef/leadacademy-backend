import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Direction } from '../../global/global.query';

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

  @ApiPropertyOptional({
    description: 'Number of rows per page',
    example: '10',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  rowsPerPage?: number;

  @ApiPropertyOptional({
    description: 'Current page number',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Text to search for',
    example: 'example search text',
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  is_published?: string;

  @ApiPropertyOptional({
    description: 'Direction of sorting',
    example: 'asc',
  })
  @IsOptional()
  @IsEnum(Direction)
  direction?: Direction;
}
