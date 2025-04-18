import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CampusController],
  providers: [CampusService, PrismaService],
})
export class CampusModule {}
