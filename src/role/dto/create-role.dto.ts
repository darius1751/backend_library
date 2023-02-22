import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    
    @IsString()
    public readonly name:string;

    @IsArray({
        context: Number
    })
    public readonly permissionCodes: number[];

    @IsString()
    @IsOptional()
    public readonly description?:string;
}
