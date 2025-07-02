import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { GlobalQueryDto } from '../global/global.query';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { NewsRtDto } from './dto/news-rt.dto';
import { NewsDto } from '../admin/news/dto/news-dto';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // @Patch('generate/generate-url-id')
  // generateUrl() {
  //   return this.newsService.generateUrlId();
  // }

  @Get()
  @ApiOkResponse({
    description: 'List of all news items',
    type: NewsRtDto,
  })
  findAll(@Query() query: GlobalQueryDto) {
    return this.newsService.findAll(query);
  }

  @Get(':news_id')
  @ApiOkResponse({
    description: 'Details of a specific news item',
    type: NewsDto,
  })
  @ApiParam({
    name: 'news_id',
    description: 'Unique ID of the news item',
    type: String,
  })
  findOne(@Param('news_id') news_id: string) {
    return this.newsService.findOne(news_id);
  }
}
