import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseDto } from '../admin/courses/dto/course.dto';
import { CoursesQuery } from './dto/courses-query.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: CoursesQuery): Promise<CourseDto[]> {
    const { location, season, limit } = query;

    const whereQuery: any = {};

    if (location) {
      whereQuery.campuse = {
        campus_name_short: location,
      };
    }

    if (season) {
      const ranges = season
        .split(',')
        .map((range) => {
          const [startStr, endStr] = range.split('-');
          const start = new Date(startStr);
          const end = new Date(endStr);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

          return {
            start: new Date(start.setHours(0, 0, 0, 0)),
            end: new Date(end.setHours(23, 59, 59, 999)),
          };
        })
        .filter((r) => r !== null) as { start: Date; end: Date }[];

      if (ranges.length > 0) {
        whereQuery.OR = ranges.map((range) => ({
          start_date: {
            gte: range.start,
            lte: range.end,
          },
        }));
      }
    }

    const allCourses = await this.prisma.course.findMany({
      where: whereQuery,
      take: limit ? Number(limit) : 50,
      orderBy: {
        start_date: 'desc',
      },
      include: {
        files_course_assn: { include: { media: true } },
        media_course_assn: { include: { media: true } },
        lecturer_course_assn: { include: { lecturer: true } },
        campuse: {
          include: {
            campus_file_assn: { include: { media: true } },
            campus_media_assn: { include: { media: true } },
          },
        },
        _count: {
          select: {
            application: {
              where: {
                OR: [{ status: 'approved' }, { status: 'pending-payment' }],
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
                OR: [
                  {
                    status: 'approved',
                  },
                  {
                    status: 'pending-payment',
                  },
                ],
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
