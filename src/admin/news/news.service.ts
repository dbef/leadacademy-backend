import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { NewsDto } from './dto/news-dto';
import { UpdateNewsDto } from './dto/edit-news-dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsDto> {
    const {
      description_en,
      description_ka,
      title_en,
      title_ka,
      keywords_en,
      hash_tags,
      news_media,
      keywords_ka,
      short_des_en,
      short_des_ka,
    } = createNewsDto;

    const url_id = title_en
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newNews = await this.prisma.news.create({
      data: {
        description_en,
        description_ka,
        title_en,
        title_ka,
        short_des_en: short_des_en ? short_des_en : null,
        short_des_ka: short_des_ka ? short_des_ka : null,
        url_id: url_id,
        keywords_en: keywords_en ? keywords_en : null,
        hashtags: hash_tags ? hash_tags : null,
        keywords_ka: keywords_ka ? keywords_ka : null,
      },
    });

    if (news_media) {
      const refactoredNewsMedia = news_media.map((media) => {
        return {
          media_id: media.media_id,
          news_id: newNews.news_id,
        };
      });

      await this.prisma.newsMediaAssn.createMany({
        data: refactoredNewsMedia,
      });
    }

    const updatedNewsMedia = await this.prisma.news.findUnique({
      where: {
        news_id: newNews.news_id,
      },
      include: {
        news_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!updatedNewsMedia) {
      throw new ConflictException('Course not found');
    }

    return updatedNewsMedia;
  }

  async editNews(data: UpdateNewsDto, news_id: string): Promise<NewsDto> {
    const {
      description_en,
      description_ka,
      title_en,
      title_ka,
      keywords_en,
      keywords_ka,
      short_des_en,
      hash_tags,
      news_media,
      short_des_ka,
    } = data;

    const news = await this.prisma.news.findUnique({
      where: {
        news_id,
      },
    });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    await this.prisma.news.update({
      where: {
        news_id,
      },
      data: {
        description_en,
        description_ka,
        title_en,
        title_ka,
        short_des_en: short_des_en ? short_des_en : null,
        short_des_ka: short_des_ka ? short_des_ka : null,
        keywords_en: keywords_en ? keywords_en : null,
        keywords_ka: keywords_ka ? keywords_ka : null,
        hashtags: hash_tags ? hash_tags : null,
      },
    });

    if (news_media.length > 0) {
      await this.prisma.newsMediaAssn.deleteMany({
        where: {
          news_id,
        },
      });

      const refactoredNewsMedia = news_media.map((media) => {
        return {
          media_id: media.media_id,
          news_id,
        };
      });

      await this.prisma.newsMediaAssn.createMany({
        data: refactoredNewsMedia,
      });
    }

    if (news_media.length < 1) {
      throw new ConflictException('News media is required');
    }

    const updatedNewsMedia = await this.prisma.news.findUnique({
      where: {
        news_id: news_id,
      },
      include: {
        news_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!updatedNewsMedia) {
      throw new ConflictException('News not found');
    }

    return updatedNewsMedia;
  }

  async remove(news_id: string) {
    const foundedNews = this.prisma.news.findUnique({
      where: {
        news_id,
      },
    });

    if (!foundedNews) {
      throw new NotFoundException('News not found');
    }

    await this.prisma.newsMediaAssn.deleteMany({
      where: {
        news_id,
      },
    });

    await this.prisma.news.delete({
      where: {
        news_id,
      },
    });

    return {
      message: 'News deleted successfully',
    };
  }
}
