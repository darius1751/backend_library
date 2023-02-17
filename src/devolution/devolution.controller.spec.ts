import { Test, TestingModule } from '@nestjs/testing';
import { DevolutionController } from './devolution.controller';
import { DevolutionService } from './devolution.service';

describe('DevolutionController', () => {
  let controller: DevolutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevolutionController],
      providers: [DevolutionService],
    }).compile();

    controller = module.get<DevolutionController>(DevolutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
