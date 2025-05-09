import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return plainToInstance(UserEntity, user);
  }

  @Get('find-by-email')
  async getUserByEmail(@Query('email') email: string) {
    const user = this.userService.findByEmail(email);
    return plainToInstance(UserEntity, user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = this.userService.findById(id);
    return plainToInstance(UserEntity, user);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    const user = this.userService.update(id, UpdateUserDto);
    return plainToInstance(UserEntity, user);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }
}
