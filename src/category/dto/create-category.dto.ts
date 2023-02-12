import { IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    public readonly name:string;

    @IsString()
    @IsOptional()
    public readonly description?:string;
}
