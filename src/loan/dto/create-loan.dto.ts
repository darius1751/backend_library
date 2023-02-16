import { IsUUID } from "class-validator";

export class CreateLoanDto {
    
    @IsUUID()
    public readonly copyBookId: string;

    @IsUUID()
    public readonly personId: string;
}
