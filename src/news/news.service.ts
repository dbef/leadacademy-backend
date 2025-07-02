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
    const foundedNews = this.prisma.news.findFirst({
      where: {
        OR: [
          {
            news_id: news_id,
          },
          {
            url_id: news_id,
          },
        ],
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

  async generateUrlId() {
    const data = await this.prisma.news.findMany();

    for (const course of data) {
      const url_id = course.title_en
        .toLowerCase()
        .normalize('NFKD') // handle special unicode chars
        .replace(/[^\w\s-]/g, '') // remove all non-word, non-space, non-dash chars
        .replace(/\s+/g, '-') // replace spaces (and nbsp) with dashes
        .replace(/-+/g, '-') // collapse multiple dashes
        .replace(/^-+|-+$/g, '');

      await this.prisma.news.update({
        where: {
          news_id: course.news_id,
        },
        data: {
          url_id,
        },
      });
    }

    return 'All doneeeeeeeeeeeeeeeeeeeee';
  }
}
