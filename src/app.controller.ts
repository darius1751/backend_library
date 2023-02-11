import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly authService:AuthService
  ) {}
  
  @Get()
  getHello() {
    const token = this.authService.generateToken('123512313');
    //return {token};
    return this.appService.getHello();
  }
}
