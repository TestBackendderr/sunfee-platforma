import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ERROR_MESSAGES } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.USER_EXIST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
    return await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteById(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }

  async validatePassword(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }
}
