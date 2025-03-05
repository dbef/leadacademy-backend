import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from './file.dto';

export class FileDtoRt {
  @ApiProperty({
    description: 'List of files',
    type: [FileDto],
  })
  data: FileDto[];

  @ApiProperty({
    description: 'Total number of files',
    type: Number,
  })
  count: number;
}
