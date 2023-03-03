import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { CreateLoanDto } from './create-loan.dto';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {

    @IsDateString()
    @IsOptional()
    public readonly returnDate?: string;

    @IsUUID()
    @IsOptional()
    public readonly loanStateId: string;

}
