import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDevolutionDto {
    
    @IsUUID()
    public readonly loanId: string;

    @IsUUID()
    public readonly devolutionStateId: string;

    @IsString()
    @IsOptional()
    public readonly annotations?: string;

}