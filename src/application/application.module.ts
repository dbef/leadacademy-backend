import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService, MailService],
})
export class ApplicationModule {}
