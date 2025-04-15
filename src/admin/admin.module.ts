import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsController } from './applications/applications.controller';
import { ApplicationsService } from './applications/applications.service';
import { MailService } from '../mail/mail.service';
import { CampusController } from './campus/campus.controller';
import { CampusService } from './campus/campus.service';
import { LecturerController } from './lecturer/lecturer.controller';
import { LecturerService } from './lecturer/lecturer.service';
import { NewsModule } from './news/news.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot(),
    NewsModule,
    PaymentModule,
  ],
  controllers: [
    AdminController,
    FilesController,
    CoursesController,
    ApplicationsController,
    CampusController,
    LecturerController,
  ],
  providers: [
    AdminService,
    PrismaService,
    FilesService,
    CoursesService,
    ApplicationsService,
    MailService,
    CampusService,
    LecturerService,
  ],
})
export class AdminModule {}
