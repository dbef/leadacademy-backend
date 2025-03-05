import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FolderDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Folder name',
    type: String,
    required: true,
  })
  folder_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Folder name',
    type: String,
    required: true,
  })
  folder_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Folder name',
    type: String,
    required: true,
  })
  created_at: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Folder name',
    type: String,
    required: true,
  })
  updated_at: Date;
}
