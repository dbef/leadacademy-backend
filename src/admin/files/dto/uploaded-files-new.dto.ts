import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewUploadedFiles {
  @IsString()
  @ApiProperty({
    type: String,
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  type: string;
}

export class NewUploadedFilesBody {
  @ApiProperty({
    type: [NewUploadedFiles],
  })
  files: NewUploadedFiles[];
}
