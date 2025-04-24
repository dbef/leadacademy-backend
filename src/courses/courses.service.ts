import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseDto } from '../admin/courses/dto/course.dto';
import { CoursesQuery } from './dto/courses-query.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  getMonthRange(monthName: string): { start: string; end: string } {
    const monthIndexMap: Record<string, number> = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    };

    const lowerMonth = monthName.toLowerCase();
    const monthIndex = monthIndexMap[lowerMonth];

    if (monthIndex === undefined) {
      throw new Error(`Invalid month name: "${monthName}"`);
    }

    const year = new Date().getFullYear();

    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0); // day 0 of next month = last day of current month

    const formatDate = (date: Date): string =>
      `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
      `${date.getDate().toString().padStart(2, '0')}/` +
      `${date.getFullYear()}`;

    return {
      start: formatDate(start),
      end: formatDate(end),
    };
  }

  async findAll(query: CoursesQuery): Promise<CourseDto[]> {
    const {
      location,
      season,
      limit,
      direction,
      page,
      rowsPerPage,
      searchText,
      is_published,
      sortBy,
    } = query;

    const whereQuery: any = {
      start_date: {
        gte: new Date(),
      },
      is_published: true,
    };

    let orderByQuery = {};

    if (is_published) {
      if (is_published === 'true') {
        whereQuery.is_published = true;
      }

      if (is_published === 'false') {
        whereQuery.is_published = false;
      }

      if (is_published === 'all') {
        delete whereQuery.is_published;
      }
    }

    if (location) {
      whereQuery.campuse = {
        campus_name_short: location,
      };
    }

    if (season) {
      const mappedSeasons = season.split(',').map((s) => {
        return this.getMonthRange(s);
      });

      const ranges = mappedSeasons
        .map((range) => {
          const start = new Date(range.start);
          const end = new Date(range.end);

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

    if (sortBy && direction) {
      orderByQuery = {
        [sortBy]: direction.toLocaleLowerCase() === 'asc' ? 'asc' : 'desc',
      };
    } else {
      orderByQuery = {
        start_date: 'asc',
      };
    }

    console.log('Where query:', whereQuery);

    const allCourses = await this.prisma.course.findMany({
      where: whereQuery,
      orderBy: orderByQuery,
      take: Number(limit ? limit : 50),
      skip: Number(page ? page : 0) * Number(limit ? limit : 50),
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
                OR: [{ status: 'approved' }, { status: 'paid' }],
              },
            },
          },
        },
      },
    });

    console.log('allCourses', allCourses);

    return allCourses;
  }

  async findOne(id: string): Promise<CourseDto> {
    const foudedCourse = await this.prisma.course.findUnique({
      where: {
        course_id: id,
        start_date: {
          gte: new Date(),
        },
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
                    status: 'paid',
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
