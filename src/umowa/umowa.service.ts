import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUmowaDto } from './dto/create-umowa.dto';
import { UpdateUmowaDto } from './dto/update-umowa.dto';

@Injectable()
export class UmowaService {
  constructor(private prisma: PrismaService) {}

  async create(createUmowaDto: CreateUmowaDto) {
    return this.prisma.umowa.create({
      data: {
        ...createUmowaDto,
        dataPodpisania: new Date(createUmowaDto.dataPodpisania),
      },
    });
  }

  async findAll() {
    return this.prisma.umowa.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.umowa.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.umowa.findMany({
      where: { userId },
    });
  }

  async update(id: number, updateUmowaDto: UpdateUmowaDto) {
    return this.prisma.umowa.update({
      where: { id },
      data: {
        ...updateUmowaDto,
        dataPodpisania: updateUmowaDto.dataPodpisania
          ? new Date(updateUmowaDto.dataPodpisania)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.umowa.delete({
      where: { id },
    });
  }
}
