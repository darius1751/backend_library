import { Test, TestingModule } from '@nestjs/testing';
import { DevolutionStateService } from './devolution-state.service';

describe('DevolutionStateService', () => {
  let service: DevolutionStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevolutionStateService],
    }).compile();

    service = module.get<DevolutionStateService>(DevolutionStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
