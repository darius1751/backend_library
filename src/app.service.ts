import { Injectable, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt-guard/jwt.guard';

@Injectable()
export class AppService {
  @UseGuards(JwtGuard)
  getHello(): string {
    return 'Hello World!';
  }
}
