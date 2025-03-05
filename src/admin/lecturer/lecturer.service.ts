import { Injectable } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FilesService } from '../files/files.service';
import { LecturerDto } from './dto/lecturer.dto';

@Injectable()
export class LecturerService {
  constructor(
    private prisma: PrismaService,
    private fileService: FilesService,
  ) {}

  async create(createLecturerDto: CreateLecturerDto): Promise<LecturerDto> {
    const newLecturer = await this.prisma.lecturer.create({
      data: {
        ...createLecturerDto,
      },
    });

    return newLecturer;
  }

  async findAll() {
    return this.prisma.lecturer.findMany();
  }

  async findOne(id: string): Promise<LecturerDto> {
    const foundedLecturer = await this.prisma.lecturer.findUnique({
      where: {
        id,
      },
    });

    if (!foundedLecturer) {
      throw new Error('Lecturer not found');
    }

    return foundedLecturer;
  }

  async update(
    id: string,
    createLecturerDto: CreateLecturerDto,
  ): Promise<LecturerDto> {
    const foundedLecturer = await this.prisma.lecturer.findUnique({
      where: {
        id,
      },
    });

    if (!foundedLecturer) {
      throw new Error('Lecturer not found');
    }

    if (!createLecturerDto.picture && foundedLecturer.picture) {
      await this.fileService.removeImage(foundedLecturer.picture);
    }

    const updatedLecturer = await this.prisma.lecturer.update({
      where: {
        id,
      },
      data: {
        ...createLecturerDto,
      },
    });

    return updatedLecturer;
  }

  async remove(id: string) {
    const foundedLecturer = await this.prisma.lecturer.findUnique({
      where: {
        id,
      },
    });

    if (!foundedLecturer) {
      throw new Error('Lecturer not found');
    }

    if (foundedLecturer.picture) {
      await this.fileService.removeImage(foundedLecturer.picture);
    }

    await this.prisma.lecturerCourseAssn.deleteMany({
      where: {
        lecturer_id: id,
      },
    });

    await this.prisma.lecturer.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Lecturer deleted successfully',
    };
  }
}
