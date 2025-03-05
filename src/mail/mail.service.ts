import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { applicationSuccess } from './helpers/htmlTemplates';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendApplicationPaymentMail(
    to: string,
    link: string,
    courseName: string,
    courseStartDate: Date,
    parent_name: string,
  ) {
    try {
      await this.mailService.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: 'Payment for course',
        html: applicationSuccess(
          link,
          courseName,
          courseStartDate,
          parent_name,
        ),
      });
      return 'Email sent';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
