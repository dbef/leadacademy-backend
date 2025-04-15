import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { EditCourseDto } from './dto/update-course.dto';
import { CourseDto } from './dto/course.dto';
import { FilesService } from '../files/files.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private fileService: FilesService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    user_id: string,
  ): Promise<CourseDto> {
    const {
      description_en,
      description_ka,
      end_date,
      lecturer_id,
      max_students,
      price,
      start_date,
      title_en,
      title_ka,
      course_media,
      course_files,
      campus_id,
      lecturers,
      keywords_en,
      keywords_ka,
      short_des_en,
      is_published,
      short_des_ka,
    } = createCourseDto;

    if (lecturer_id) {
      const lecturer = await this.prisma.lecturer.findUnique({
        where: {
          id: lecturer_id,
        },
      });

      if (!lecturer) {
        throw new Error('Lecturer not found');
      }
    }

    const newCourse = await this.prisma.course.create({
      data: {
        description_en,
        description_ka,
        end_date: new Date(end_date),
        max_students,
        price,
        start_date: new Date(start_date),
        title_en,
        title_ka,
        is_published,
        campuse_id: campus_id ? campus_id : null,
        short_des_en: short_des_en ? short_des_en : null,
        short_des_ka: short_des_ka ? short_des_ka : null,
        keywords_en: keywords_en ? keywords_en : null,
        keywords_ka: keywords_ka ? keywords_ka : null,
        lecturer_id: lecturer_id ? lecturer_id : null,
      },
    });

    if (lecturers) {
      const refactoredLecturers = lecturers.map((lecturer) => {
        return {
          lecturer_id: lecturer,
          course_id: newCourse.course_id,
        };
      });

      await this.prisma.lecturerCourseAssn.createMany({
        data: refactoredLecturers,
      });
    }

    if (course_media) {
      const refactoredCourseMedia = course_media.map((media) => {
        return {
          media_id: media.media_id,
          course_id: newCourse.course_id,
        };
      });

      await this.prisma.mediaCourseAssn.createMany({
        data: refactoredCourseMedia,
      });
    }

    if (course_files) {
      const refactoredCourseMedia = course_files.map((media) => {
        return {
          media_id: media.media_id,
          course_id: newCourse.course_id,
        };
      });

      await this.prisma.fileCourseAssn.createMany({
        data: refactoredCourseMedia,
      });
    }

    const updatedCourseMedia = await this.prisma.course.findUnique({
      where: {
        course_id: newCourse.course_id,
      },
      include: {
        media_course_assn: {
          include: {
            media: true,
          },
        },
        files_course_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!updatedCourseMedia) {
      throw new ConflictException('Course not found');
    }

    return updatedCourseMedia;
  }

  async editCourse(data: EditCourseDto, course_id: string): Promise<CourseDto> {
    const {
      description_en,
      description_ka,
      end_date,
      lecturer_id,
      max_students,
      price,
      start_date,
      title_en,
      title_ka,
      course_media,
      course_files,
      campus_id,
      lecturers,
      keywords_en,
      keywords_ka,
      short_des_en,
      short_des_ka,
      is_published,
    } = data;

    const course = await this.prisma.course.findUnique({
      where: {
        course_id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.prisma.course.update({
      where: {
        course_id,
      },
      data: {
        description_en,
        description_ka,
        end_date: new Date(end_date),
        start_date: new Date(start_date),
        title_en,
        title_ka,
        max_students,
        price,
        is_published,
        campuse_id: campus_id ? campus_id : null,
        short_des_en: short_des_en ? short_des_en : null,
        short_des_ka: short_des_ka ? short_des_ka : null,
        keywords_en: keywords_en ? keywords_en : null,
        keywords_ka: keywords_ka ? keywords_ka : null,
        lecturer_id: lecturer_id ? lecturer_id : null,
      },
    });

    if (course_files.length > 0) {
      await this.prisma.fileCourseAssn.deleteMany({
        where: {
          course_id,
        },
      });

      const refactoredCourseFiles = course_files.map((media) => {
        return {
          media_id: media.media_id,
          course_id,
        };
      });

      await this.prisma.fileCourseAssn.createMany({
        data: refactoredCourseFiles,
      });
    }

    if (course_files.length < 1) {
      await this.prisma.fileCourseAssn.deleteMany({
        where: {
          course_id,
        },
      });
    }

    if (lecturers.length > 0) {
      await this.prisma.lecturerCourseAssn.deleteMany({
        where: {
          course_id,
        },
      });

      const refactoredLecturers = lecturers.map((lecturer) => {
        return {
          lecturer_id: lecturer,
          course_id,
        };
      });

      await this.prisma.lecturerCourseAssn.createMany({
        data: refactoredLecturers,
      });
    }

    if (lecturers.length < 1) {
      await this.prisma.lecturerCourseAssn.deleteMany({
        where: {
          course_id,
        },
      });
    }

    if (course_media.length > 0) {
      await this.prisma.mediaCourseAssn.deleteMany({
        where: {
          course_id,
        },
      });

      const refactoredCourseFiles = course_media.map((media) => {
        return {
          media_id: media.media_id,
          course_id,
        };
      });

      await this.prisma.mediaCourseAssn.createMany({
        data: refactoredCourseFiles,
      });
    }

    if (course_media.length < 1) {
      throw new ConflictException('Course media is required');
    }

    const updatedCourseMedia = await this.prisma.course.findUnique({
      where: {
        course_id: course.course_id,
      },
      include: {
        media_course_assn: {
          include: {
            media: true,
          },
        },
        files_course_assn: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!updatedCourseMedia) {
      throw new ConflictException('Course not found');
    }

    return updatedCourseMedia;
  }

  async deleteCourse(course_id: string) {
    const foundedCourse = await this.prisma.course.findUnique({
      where: {
        course_id,
      },
      include: {
        course_media: true,
        application: true,
      },
    });

    if (!foundedCourse) {
      throw new NotFoundException('Course not found');
    }

    await this.prisma.fileCourseAssn.deleteMany({
      where: {
        course_id,
      },
    });

    if (foundedCourse.application.length > 0) {
      throw new ConflictException('Course has applications');
    }

    await this.prisma.mediaCourseAssn.deleteMany({
      where: {
        course_id,
      },
    });

    await this.prisma.lecturerCourseAssn.deleteMany({
      where: {
        course_id,
      },
    });

    await this.prisma.course.delete({
      where: {
        course_id,
      },
    });

    return {
      message: 'Course deleted successfully',
    };
  }

  async getCourseById(course_id: string): Promise<CourseDto> {
    const course = await this.prisma.course.findUnique({
      where: {
        course_id,
      },
      include: {
        media_course_assn: {
          include: {
            media: true,
          },
        },
        files_course_assn: {
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
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
}
