import { IsString } from "class-validator";

export class UpdateDevolutionDto {
    
    @IsString()
    public readonly annotations: string;
}
