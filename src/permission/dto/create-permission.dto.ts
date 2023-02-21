import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePermissionDto{
 
    @IsString()
    public readonly name:string;

    @IsNumber()
    @IsPositive()
    public readonly code: number;
    
    @IsString()
    @IsOptional()
    public readonly description?:string;
}