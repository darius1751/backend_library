import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  
  constructor(private authService:AuthService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try{
      const request:Request = context.switchToHttp().getRequest();
    const authorization = request.get('authorization');
    return this.authService.validateToken(authorization).valueOf();
    }catch(exception){
      throw new UnauthorizedException(`Error JWT`);
    }
    
  }
}
