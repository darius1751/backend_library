import { Test, TestingModule } from '@nestjs/testing';
import { DevolutionService } from './devolution.service';

describe('DevolutionService', () => {
  let service: DevolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevolutionService],
    }).compile();

    service = module.get<DevolutionService>(DevolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
