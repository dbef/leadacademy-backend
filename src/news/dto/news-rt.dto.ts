import { ApiProperty } from '@nestjs/swagger';
import { NewsDto } from '../../admin/news/dto/news-dto';

export class NewsRtDto {
  @ApiProperty({
    description: 'List of news items',
    type: [NewsDto],
  })
  data: NewsDto[];

  @ApiProperty({
    description: 'Total number of news items',
    type: Number,
  })
  count: number;
}
