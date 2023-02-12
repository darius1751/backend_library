import { IsOptional, IsString } from "class-validator";

export class CreateCopyBookStateDto {
    
    @IsString()
    public readonly name:string;

    @IsString()
    @IsOptional()
    public readonly description?:string;
}
