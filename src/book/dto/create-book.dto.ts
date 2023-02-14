import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBookDto {

    @IsString()
    public readonly code: string;
    
    @IsString()
    public readonly title: string;

    @IsDate()
    public readonly publicationDate: string;

    @IsUUID()
    public readonly authorId: string;

    @IsString()
    @IsOptional()
    public readonly description?: string;
}
