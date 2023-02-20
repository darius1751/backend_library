import { IsDateString, IsOptional, IsUUID } from "class-validator";

export class UpdateReservationDto{
    
    @IsDateString()
    public readonly claimDate: string;

    @IsUUID()
    @IsOptional()
    public readonly reservationStateId?: string;
}
