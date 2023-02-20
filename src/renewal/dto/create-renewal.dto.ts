import { IsDateString, IsUUID } from "class-validator";

export class CreateRenewalDto {
    
    @IsUUID()
    public readonly loanId: string;

    @IsDateString()
    public readonly newReturnDate: string;
    
}
