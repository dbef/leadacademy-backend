import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateNewsDto } from './dto/edit-news-dto';
import { NewsDto } from './dto/news-dto';
import { JwtAdminAccessGuard } from '../guards/admin.guard';

@Controller('admin/news')
@ApiTags('News')
@UseGuards(JwtAdminAccessGuard)
@ApiBearerAuth()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOkResponse({
    description: 'News item created successfully',
    type: NewsDto,
  })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Patch(':news_id')
  @ApiParam({
    name: 'news_id',
    description: 'Unique ID of the news item',
    type: String,
  })
  @ApiOkResponse({
    description: 'News item updated successfully',
    type: NewsDto,
  })
  update(
    @Param('news_id') news_id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.editNews(updateNewsDto, news_id);
  }

  @Delete(':news_id')
  @ApiParam({
    name: 'news_id',
    description: 'Unique ID of the news item',
    type: String,
  })
  remove(@Param('news_id') news_id: string) {
    return this.newsService.remove(news_id);
  }
}
