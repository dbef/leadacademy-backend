import { Injectable, NotFoundException } from '@nestjs/common';
import { GlobalQueryDto } from '../global/global.query';
import { PrismaService } from '../prisma/prisma.service';
import { NewsRtDto } from './dto/news-rt.dto';
import { NewsDto } from '../admin/news/dto/news-dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GlobalQueryDto): Promise<NewsRtDto> {
    const { direction, page, rowsPerPage } = query;

    const allNews = await this.prisma.news.findMany({
      take: Number(rowsPerPage),
      skip: Number(page) * Number(rowsPerPage),
      orderBy: {
        created_at: direction.toLowerCase() as 'asc' | 'desc',
      },
      include: {
        news_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    const count = await this.prisma.news.count();
    return {
      count,
      data: allNews,
    };
  }

  async findOne(news_id: string): Promise<NewsDto> {
    const foundedNews = this.prisma.news.findUnique({
      where: {
        news_id,
      },
      include: {
        news_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!foundedNews) {
      throw new NotFoundException('News not found');
    }

    return foundedNews;
  }
}
