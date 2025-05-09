import { Module } from '@nestjs/common';
import { UmowaService } from './umowa.service';
import { UmowaController } from './umowa.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UmowaController],
  providers: [UmowaService, PrismaService],
})
export class UmowaModule {}
