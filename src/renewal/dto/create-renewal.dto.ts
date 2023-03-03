import { IsUUID } from "class-validator";

export class CreateRenewalDto {
    
    @IsUUID()
    public readonly loanId: string;

}
