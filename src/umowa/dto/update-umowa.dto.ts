import { PartialType } from '@nestjs/mapped-types';
import { CreateUmowaDto } from './create-umowa.dto';

export class UpdateUmowaDto extends PartialType(CreateUmowaDto) {}
