import { Test, TestingModule } from '@nestjs/testing';
import { LoanStateController } from './loan-state.controller';
import { LoanStateService } from './loan-state.service';

describe('LoanStateController', () => {
  let controller: LoanStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanStateController],
      providers: [LoanStateService],
    }).compile();

    controller = module.get<LoanStateController>(LoanStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
