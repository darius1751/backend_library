import { Test, TestingModule } from '@nestjs/testing';
import { LoanStateService } from './loan-state.service';

describe('LoanStateService', () => {
  let service: LoanStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanStateService],
    }).compile();

    service = module.get<LoanStateService>(LoanStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
