import { PartialType } from '@nestjs/mapped-types';
import { CreateCopyBookDto } from './create-copy-book.dto';

export class UpdateCopyBookDto extends PartialType(CreateCopyBookDto) {}
