import { IsArray } from "class-validator";

export class AddCategoryDTO{
    @IsArray()
    public readonly categories: string[];
    
}