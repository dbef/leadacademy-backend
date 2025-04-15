import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../../mail/mail.service';
import { ApplicationDto } from './dto/application.dto';
import { UpdateApplicationDtoAdmin } from './dto/update-application.dto';
import * as argon2 from 'argon2';
import { PaymentService } from '../../payment/payment.service';
@Injectable()
export class ApplicationsService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
    private mailService: MailService,
  ) {}

  generateRandom7DigitNumber(): number {
    return Math.floor(1000000 + Math.random() * 9000000);
  }

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

    if (updateApplicationDto.status === 'pending-payment') {
      const link = `${process.env.BASE_API_URL}/payment/redirect/${id}`;

      await this.mailService.sendApplicationPaymentMail(
        foundedApplication.parent_email,
        link,
        foundedApplication.course.title_en,
        foundedApplication.course.start_date,
        foundedApplication.parent_name,
        foundedApplication.course.price,
        foundedApplication.student_name,
        foundedApplication.student_lastname,
      );
    }

    if (updateApplicationDto.status === 'approved') {
      const passwd = this.generateRandom7DigitNumber().toString();

      const hashedPassword = await argon2.hash(passwd);

      const foundedUser = await this.prisma.user.findFirst({
        where: {
          email: foundedApplication.student_email,
        },
      });

      if (!foundedUser) {
        await this.prisma.user.create({
          data: {
            email: foundedApplication.student_email,
            password: hashedPassword,
          },
        });
      }

      await this.mailService.sendConfirmation(
        foundedApplication.parent_email,
        'https://google.com',
        foundedApplication.course.title_en,
        foundedApplication.course.start_date,
        foundedApplication.parent_name,
        foundedApplication.student_email,
        foundedUser
          ? 'User already registered and please use registered password'
          : passwd,
      );
    }

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
      orderBy: {
        created_at: 'desc',
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
