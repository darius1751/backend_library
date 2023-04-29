import { PartialType } from '@nestjs/mapped-types';
import { CreateFreeDto } from './create-free.dto';

export class UpdateFreeDto extends PartialType(CreateFreeDto) {}
