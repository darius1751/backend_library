import { IsUUID } from "class-validator";

export class CreateCopyBookDto {

    @IsUUID()
    public readonly bookId: string;
    
}
