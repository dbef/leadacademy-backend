import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadedFilesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'original_name',
    description: 'The original name of the file',
  })
  original_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'url',
    description: 'The url of the file',
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'type',
    description: 'The type of the file',
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'locaiton',
    description: 'The type of the file',
  })
  location: string;
}
