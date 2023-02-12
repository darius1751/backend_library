import { Controller, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    
    constructor(private authService:AuthService){}

    @Post()
    public generate(/*@Param('id', ParseUUIDPipe)*/ id: string){
        const token = this.authService.generateToken(id);
        return {token};
    }
}