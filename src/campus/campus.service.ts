import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampusDto } from '../admin/campus/dto/campus.dto';

@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CampusDto[]> {
    const campuses = await this.prisma.campus.findMany({
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

    return campuses;
  }

}
