import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseDto } from '../admin/courses/dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CourseDto[]> {
    const allCourses = await this.prisma.course.findMany({
      include: {
        files_course_assn: {
          include: {
            media: true,
          },
        },
        media_course_assn: {
          include: {
            media: true,
          },
        },
        lecturer_course_assn: {
          include: {
            lecturer: true,
          },
        },
        campuse: {
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
        },
        _count: {
          select: {
            application: {
              where: {
                status: 'approved',
              },
            },
          },
        },
      },
    });

    return allCourses;
  }

  async findOne(id: string): Promise<CourseDto> {
    const foudedCourse = await this.prisma.course.findUnique({
      where: {
        course_id: id,
      },
      include: {
        files_course_assn: {
          include: {
            media: true,
          },
        },
        media_course_assn: {
          include: {
            media: true,
          },
        },
        lecturer_course_assn: {
          include: {
            lecturer: true,
          },
        },
        campuse: {
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
        },
        _count: {
          select: {
            application: {
              where: {
                status: {
                  not: 'rejected',
                },
              },
            },
          },
        },
      },
    });

    if (!foudedCourse) {
      throw new NotFoundException('Course not found');
    }

    return foudedCourse;
  }
}
