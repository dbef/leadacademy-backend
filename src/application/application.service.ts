import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreatedApplicationDto } from './dto/created-application-res.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<CreatedApplicationDto> {
    const {
      address,
      city,
      country,
      course_id,
      medical_terms,
      nationality,
      parent_dob,
      parent_email,
      parent_lastname,
      parent_name,
      parent_phone,
      parent_pn,
      program,
      relation,
      student_class,
      student_dob,
      student_email,
      student_lastname,
      student_name,
      student_phone,
      student_pn,
      terms_and_conditions,
      additional_info,
      alergens,
      diet_restrictions,
      medicaments,
      physical_disabilities,
      potential_roommate,
      parent_gender,
      student_gender,
      additional_comfort_info,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_relation,
      relationship_with_peers,
      social_skills,
      special_needs,
      media_release,
      days_attending,
    } = createApplicationDto;

    if (createApplicationDto.student_email) {
      const foundedApplication = await this.prisma.application.findFirst({
        where: {
          student_email: createApplicationDto.student_email,
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
          student_name,
          student_lastname,
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
        medical_terms: medical_terms,
        terms_and_conditions: terms_and_conditions,
        additional_info: additional_info,
        alergens: alergens,
        diet_restrictions: diet_restrictions,
        medicaments: medicaments,
        physical_disabilities: physical_disabilities,
        potential_roommate: potential_roommate,
        parent_address: address,
        parent_city: city,
        parent_country: country,
        parent_dob: parent_dob,
        parent_email: parent_email,
        parent_lastname: parent_lastname,
        parent_name: parent_name,
        parent_phone: parent_phone,
        parent_pn: parent_pn,
        program: program,
        relation: relation,
        student_class: student_class,
        student_dob: student_dob,
        student_email: student_email,
        student_lastname: student_lastname,
        student_name: student_name,
        student_phone: student_phone,
        student_pn: student_pn,
        media_release: media_release,
        additional_comfort_info: additional_comfort_info,
        emergency_contact_name: emergency_contact_name,
        emergency_contact_phone: emergency_contact_phone,
        emergency_relation: emergency_relation,
        relationship_with_peers: relationship_with_peers,
        days_attending: days_attending,
        social_skills: social_skills,
        special_needs: special_needs,
        course: {
          connect: {
            course_id,
          },
        },
        parent_gender: parent_gender,
        student_gender: student_gender,
        parent_nationality: nationality,
      },
    });

    if (!createdApplication) {
      throw new ConflictException('Application not created');
    }

    await this.mailService.sendNotification(
      'ketevan.beradze@leadacademy.edu.ge',
      foundedCourse.title_ka,
    );

    await this.mailService.sendNotification(
      'ana.darchiashvili@europeanschool.ge',
      foundedCourse.title_ka,
    );

    return {
      application_id: createdApplication.application_id,
    };
  }
}
