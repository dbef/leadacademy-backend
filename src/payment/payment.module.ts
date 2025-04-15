import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsService } from '../admin/applications/applications.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, ApplicationsService, MailService],
  exports: [PaymentService],
})
export class PaymentModule {}
