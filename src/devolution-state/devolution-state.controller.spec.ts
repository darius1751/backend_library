import { Test, TestingModule } from '@nestjs/testing';
import { DevolutionStateController } from './devolution-state.controller';
import { DevolutionStateService } from './devolution-state.service';

describe('DevolutionStateController', () => {
  let controller: DevolutionStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevolutionStateController],
      providers: [DevolutionStateService],
    }).compile();

    controller = module.get<DevolutionStateController>(DevolutionStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
