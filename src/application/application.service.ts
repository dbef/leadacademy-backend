import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const {
      child_dob,
      child_lastname,
      child_name,
      course_id,
      parent_email,
      parent_lastname,
      parent_name,
      parent_phone,
      parent_pn,
      relation,
      child_email,
    } = createApplicationDto;

    if (createApplicationDto.child_email) {
      const foundedApplication = await this.prisma.application.findFirst({
        where: {
          child_email: createApplicationDto.child_email,
          course_id: createApplicationDto.course_id,
        },
      });

      if (foundedApplication) {
        throw new ConflictException(
          'Application with this email already exists',
        );
      }
    }

    const foundedSameChildApplication = await this.prisma.application.findFirst(
      {
        where: {
          parent_pn,
          child_name,
          child_lastname,
          course_id,
        },
      },
    );

    if (foundedSameChildApplication) {
      throw new ConflictException('Application with this child already exists');
    }

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const foundedCourse = await this.prisma.course.findUnique({
      where: {
        course_id,
      },
      include: {
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

    if (!foundedCourse) {
      throw new NotFoundException('Course not found');
    }

    if (new Date(foundedCourse.start_date) < new Date()) {
      throw new ConflictException('Course already started');
    }

    if (foundedCourse._count.application >= foundedCourse.max_students) {
      throw new ConflictException('Course is full');
    }

    const createdApplication = await this.prisma.application.create({
      data: {
        child_dob: new Date(child_dob),
        child_lastname,
        child_name,
        course_id,
        parent_email,
        parent_lastname,
        parent_name,
        parent_phone,
        parent_pn,
        relation,
        child_email,
        status: 'pending',
      },
    });

    if (!createdApplication) {
      throw new ConflictException('Application not created');
    }

    

    return {
      message: 'Application successfully created',
    };
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
