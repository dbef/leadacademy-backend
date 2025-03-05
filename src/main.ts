import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.enableCors({
    origin: [
      'http://localhost:8082',
      'https://leadacademy-frontend.vercel.app/',
      /\.vercel\.app$/,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('LeadAcademy API v1 Checkout')
    .setDescription('LeadAcademy API v1')
    .setVersion('V1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, {
    jsonDocumentUrl: '/api/v1/docs/api.json',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
