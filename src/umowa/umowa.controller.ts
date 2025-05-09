import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UmowaService } from './umowa.service';
import { CreateUmowaDto } from './dto/create-umowa.dto';
import { UpdateUmowaDto } from './dto/update-umowa.dto';

@Controller('umowa')
export class UmowaController {
  constructor(private readonly umowaService: UmowaService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUmowaDto: CreateUmowaDto) {
    return this.umowaService.create(createUmowaDto);
  }

  @Get()
  findAll() {
    return this.umowaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.umowaService.findOne(+id);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.umowaService.findByUserId(+userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateUmowaDto: UpdateUmowaDto) {
    return this.umowaService.update(+id, updateUmowaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umowaService.remove(+id);
  }
}
