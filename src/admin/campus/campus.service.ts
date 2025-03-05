import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CampusDto } from './dto/campus.dto';

@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async create(createCampusDto: CreateCampusDto): Promise<CampusDto> {
    const {
      campus_name_en,
      campus_name_ka,
      description_en,
      description_ka,
      maps_url,
      campus_files,
      campus_media,
    } = createCampusDto;

    const newCampus = await this.prisma.campus.create({
      data: {
        description_en,
        description_ka,
        campus_name_en,
        campus_name_ka,
        maps_url,
      },
    });

    if (campus_media) {
      const refactoredCourseMedia = campus_media.map((media) => {
        return {
          media_id: media.media_id,
          campus_id: newCampus.campus_id,
        };
      });

      await this.prisma.campusMediaAssn.createMany({
        data: refactoredCourseMedia,
      });
    }

    if (campus_files) {
      const refactoredCourseMedia = campus_files.map((media) => {
        return {
          media_id: media.media_id,
          campus_id: newCampus.campus_id,
        };
      });

      await this.prisma.campusFileAssn.createMany({
        data: refactoredCourseMedia,
      });
    }

    const updatedCampusMedia = await this.prisma.campus.findUnique({
      where: {
        campus_id: newCampus.campus_id,
      },
      include: {
        campus_file_assn: {
          include: {
            media: true,
          },
        },
        campus_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!updatedCampusMedia) {
      throw new ConflictException('Course not found');
    }

    return updatedCampusMedia;
  }

  async findAll() {
    return await this.prisma.campus.findMany({
      include: {
        campus_file_assn: {
          include: {
            media: true,
          },
        },
        campus_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  async findOne(campusName: string) {
    const foundedCampus = await this.prisma.campus.findFirst({
      where: {
        OR: [
          {
            campus_name_en: campusName,
          },
          {
            campus_name_ka: campusName,
          },
          {
            campus_id: campusName,
          },
        ],
      },
      include: {
        campus_file_assn: {
          include: {
            media: true,
          },
        },
        campus_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    return foundedCampus;
  }

  async update(id: string, createCampusDto: CreateCampusDto) {
    const {
      campus_name_en,
      campus_name_ka,
      description_en,
      description_ka,
      maps_url,
      campus_files,
      campus_media,
    } = createCampusDto;

    const foundedCampus = await this.prisma.campus.findUnique({
      where: {
        campus_id: id,
      },
    });

    if (!foundedCampus) {
      throw new NotFoundException('Campus not found');
    }

    if (campus_media.length < 1) {
      throw new ConflictException('Campus media is required');
    }

    if (campus_media) {
      await this.prisma.campusMediaAssn.deleteMany({
        where: {
          campus_id: id,
        },
      });

      const refactoredCourseMedia = campus_media.map((media) => {
        return {
          media_id: media.media_id,
          campus_id: foundedCampus.campus_id,
        };
      });

      await this.prisma.campusMediaAssn.createMany({
        data: refactoredCourseMedia,
      });
    }

    if (campus_files.length > 0) {
      await this.prisma.campusFileAssn.deleteMany({
        where: {
          campus_id: id,
        },
      });

      const refactoredCourseMedia = campus_files.map((media) => {
        return {
          media_id: media.media_id,
          campus_id: foundedCampus.campus_id,
        };
      });

      await this.prisma.campusFileAssn.createMany({
        data: refactoredCourseMedia,
      });
    }

    const updatedCampusMedia = await this.prisma.campus.update({
      where: {
        campus_id: foundedCampus.campus_id,
      },
      data: {
        description_en,
        description_ka,
        campus_name_en,
        campus_name_ka,
        maps_url,
      },
      include: {
        campus_file_assn: {
          include: {
            media: true,
          },
        },
        campus_media_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!updatedCampusMedia) {
      throw new ConflictException('Course not found');
    }

    return updatedCampusMedia;
  }

  async remove(id: string) {
    const foundedCampus = await this.prisma.campus.findUnique({
      where: {
        campus_id: id,
      },
    });

    if (!foundedCampus) {
      throw new NotFoundException('Campus not found');
    }

    await this.prisma.campusMediaAssn.deleteMany({
      where: {
        campus_id: id,
      },
    });

    await this.prisma.campusFileAssn.deleteMany({
      where: {
        campus_id: id,
      },
    });

    await this.prisma.campus.delete({
      where: {
        campus_id: id,
      },
    });

    return {
      message: 'Campus deleted successfully',
    };
  }
}
