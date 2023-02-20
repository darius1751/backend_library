import { IsUUID } from "class-validator";

export class CreateReservationDto {
    
    @IsUUID()
    public readonly copyBookId: string;

    @IsUUID()
    public readonly personId: string;
}
