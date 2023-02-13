import { IsDate, IsEmail, IsObject, IsPhoneNumber, IsString, IsUUID } from "class-validator";
import { CreateCredentialDto } from "src/credential/dto/create-credential.dto";

export class CreatePersonDto {

    @IsString()
    public readonly name: string;

    @IsPhoneNumber()
    public readonly phone: string;

    @IsString()
    public readonly documentIdentifier: string;

    @IsDate()
    public readonly birthday: string;

    @IsEmail()
    public readonly email: string;

    @IsUUID()
    public readonly roleId: string;

    @IsObject({ context: CreateCredentialDto })
    public readonly credential: CreateCredentialDto;

}
