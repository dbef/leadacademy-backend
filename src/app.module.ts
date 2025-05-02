import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ApplicationModule } from './application/application.module';
import { MailModule } from './mail/mail.module';
import { CoursesModule } from './courses/courses.module';
import { GalleryModule } from './gallery/gallery.module';
import { CampusModule } from './campus/campus.module';
import { PaymentModule } from './payment/payment.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make the config globally available
      envFilePath: '.env', // Path to your .env file
    }),
    AdminModule,
    ApplicationModule,
    MailModule,
    CoursesModule,
    GalleryModule,
    CampusModule,
    PaymentModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
