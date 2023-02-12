import { Test, TestingModule } from '@nestjs/testing';
import { ReservationStateController } from './reservation-state.controller';
import { ReservationStateService } from './reservation-state.service';

describe('ReservationStateController', () => {
  let controller: ReservationStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationStateController],
      providers: [ReservationStateService],
    }).compile();

    controller = module.get<ReservationStateController>(ReservationStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
