import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateLoanDto } from './create-loan.dto';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
    
    @IsUUID()
    @IsOptional()
    public readonly loanStateId: string;
}
