import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBookDto {

    @IsString()
    public readonly code: string;
    
    @IsString()
    public readonly title: string;

    @IsDateString()
    public readonly publicationDate: string;

    @IsUUID()
    public readonly authorId: string;

    @IsString()
    @IsOptional()
    public readonly description?: string;

    @IsString()
    @IsOptional()
    public frontPage?: string;
}
