import { IsOptional, IsString } from "class-validator";

export class CreateLoanStateDto {
    
    @IsString()
    public readonly name:string;

    @IsString()
    @IsOptional()
    public readonly description?:string;

}
