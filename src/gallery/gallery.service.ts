import { Injectable } from '@nestjs/common';
import { GlobalQueryDto } from '../global/global.query';
import { FileDtoRt } from '../admin/files/dto/file-rt.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FileDto } from '../admin/files/dto/file.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: GlobalQueryDto): Promise<FileDtoRt> {
    const { direction, page, rowsPerPage, sortBy, searchText } = query;

    const allFiles = await this.prisma.media.findMany({
      where: {
        OR: [
          {
            folder: {
              folder_name: 'CourseMedia',
            },
          },
          {
            folder: {
              folder_name: 'Gallery',
            },
          },
        ],
        type: {
          contains: 'image',
        },
      },
      take: Number(rowsPerPage),
      skip: Number(page) * Number(rowsPerPage),
      orderBy: {
        created_at: direction.toLowerCase() as 'asc' | 'desc',
      },
      include: {
        folder: true,
      },
    });

    const count = await this.prisma.media.count({
      where: {
        OR: [
          {
            folder: {
              folder_name: 'CourseMedia',
            },
          },
          {
            folder: {
              folder_name: 'Gallery',
            },
          },
        ],
        type: {
          contains: 'image',
        },
      },
    });

    return {
      count,
      data: allFiles,
    };
  }

  async coverImages(): Promise<FileDto[]> {
    const images = await this.prisma.media.findMany({
      where: {
        folder: {
          folder_name: 'Cover',
        },
      },
    });

    return images;
  }
}
