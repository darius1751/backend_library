import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule
  ],
  providers: [AuthService, JwtService],
  controllers:[AuthController],
  exports: [AuthService]

})
export class AuthModule { }
