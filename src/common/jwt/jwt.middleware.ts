import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(private authService:AuthService){}

  use(req: Request, res: any, next: () => void) {
    try{
      const token = req.get('Authorization');
      this.authService.validateToken(token);
      next();
    }catch(exception){
      throw new UnauthorizedException(`Error Authorization, jwt not valid`);      
    }
    
  }
}
