import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../../mail/mail.service';
import { ApplicationDto } from './dto/application.dto';
import { UpdateApplicationDtoAdmin } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async update(id: string, updateApplicationDto: UpdateApplicationDtoAdmin) {
    const foundedApplication = await this.prisma.application.findUnique({
      where: {
        application_id: id,
      },
      include: {
        course: {
          include: {
            _count: {
              select: {
                application: true,
              },
            },
          },
        },
      },
    });

    if (!foundedApplication) {
      throw new NotFoundException('Application not found');
    }

    if (foundedApplication.course.start_date < new Date()) {
      throw new NotFoundException('Course already started');
    }

    if (
      foundedApplication.course.max_students <=
      foundedApplication.course._count.application
    ) {
      throw new NotFoundException('Course is full');
    }

    await this.prisma.application.update({
      where: {
        application_id: id,
      },
      data: {
        status: updateApplicationDto.status,
      },
    });

    await this.mailService.sendApplicationPaymentMail(
      foundedApplication.parent_email,
      'https://google.com',
      foundedApplication.course.title_en,
      foundedApplication.course.start_date,
      foundedApplication.parent_name,
    );

    return {
      message: 'Application updated successfully',
    };
  }

  async getAllApplicantsByCourseId(
    course_id: string,
    status?: string,
  ): Promise<ApplicationDto[]> {
    const queryParams: any = {
      course_id,
    };

    if (status) {
      queryParams.status = status;
    }

    const allApplicants = await this.prisma.application.findMany({
      where: queryParams,
      include: {
        course: {
          include: {
            _count: {
              select: {
                application: true,
              },
            },
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
          },
        },
      },
    });

    return allApplicants;
  }

  async getAllApplicants(status?: string): Promise<ApplicationDto[]> {
    const queryParams: any = {};

    if (status) {
      queryParams.status = status;
    }

    const allApplicants = await this.prisma.application.findMany({
      where: queryParams,
      include: {
        course: {
          include: {
            _count: {
              select: {
                application: true,
              },
            },
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
          },
        },
      },
    });

    return allApplicants;
  }
}
