import { Test, TestingModule } from '@nestjs/testing';
import { RenewalService } from './renewal.service';

describe('RenewalService', () => {
  let service: RenewalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenewalService],
    }).compile();

    service = module.get<RenewalService>(RenewalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
