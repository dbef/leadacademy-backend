import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Sabado API v1 Checkout')
    .setDescription('Sabado API v1')
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
