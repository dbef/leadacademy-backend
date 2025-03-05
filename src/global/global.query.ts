import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export class GlobalQueryDto {
  @ApiProperty({
    description: 'Number of rows per page',
    example: '10',
  })
  @IsInt()
  @Type(() => Number) // Ensures the string value is transformed to a number
  rowsPerPage: number;

  @ApiProperty({
    description: 'Current page number',
    example: '1',
  })
  @IsInt()
  @Type(() => Number) // Ensures the string value is transformed to a number
  page: number;

  @ApiPropertyOptional({
    description: 'Text to search for',
    example: 'example search text',
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiProperty({
    description: 'Field to sort by',
    example: 'name',
  })
  @IsString()
  sortBy: string;

  @ApiProperty({
    description: 'Direction of sorting',
    example: 'asc',
  })
  @IsEnum(Direction)
  direction: Direction;
}
