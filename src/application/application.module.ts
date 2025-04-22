import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { PaymentService } from '../payment/payment.service';
import { PaymentModule } from '../payment/payment.module';
import { ApplicationsService } from '../admin/applications/applications.service';

@Module({
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    PrismaService,
    MailService,
    PaymentService,
    ApplicationsService,
  ],
  imports: [PaymentModule],
})
export class ApplicationModule {}
