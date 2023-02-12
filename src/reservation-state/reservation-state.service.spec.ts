import { Test, TestingModule } from '@nestjs/testing';
import { ReservationStateService } from './reservation-state.service';

describe('ReservationStateService', () => {
  let service: ReservationStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationStateService],
    }).compile();

    service = module.get<ReservationStateService>(ReservationStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
