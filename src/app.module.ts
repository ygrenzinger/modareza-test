import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { PrismaService } from './prisma.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppRepository, PrismaService],
})
export class AppModule {}
