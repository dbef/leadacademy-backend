import { ApiPropertyOptional } from '@nestjs/swagger';
import { GlobalQueryDto } from '../../../global/global.query';
import { IsOptional } from 'class-validator';

export class FileQueryDto extends GlobalQueryDto {
  @ApiPropertyOptional({
    description: 'folder name',
    type: String,
  })
  @IsOptional()
  folder_name?: string;

  @ApiPropertyOptional({
    description: 'folder name',
    type: String,
  })
  @IsOptional()
  file_type?: string;
}
