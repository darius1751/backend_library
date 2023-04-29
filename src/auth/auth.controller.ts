import { Controller, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    
    constructor(private authService:AuthService){}

    @Post('/:roleId')
    public generate(@Param('roleId', ParseUUIDPipe) roleId: string){
        const token = this.authService.generateToken(roleId);
        return {token};
    }
}