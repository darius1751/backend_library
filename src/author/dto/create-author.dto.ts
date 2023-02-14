import { IsString } from "class-validator";

export class CreateAuthorDto {

    @IsString()
    public readonly name:string;
}
