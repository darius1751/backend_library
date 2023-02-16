import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateCopyBookDto } from './create-copy-book.dto';

export class UpdateCopyBookDto extends PartialType(CreateCopyBookDto) {

    @IsUUID()
    public readonly copyBookStateId: string;
}
