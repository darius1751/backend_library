import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ConfigModule.forRoot()],
      providers: [AuthService,JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('generate is valid', () => {
    const payLoad = '150714550';
    const token = service.generateToken(payLoad);
    expect(token).toBeDefined();
    expect(service.validateToken(token)).toBeTruthy();
  })
});
