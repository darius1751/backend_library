import { Test, TestingModule } from '@nestjs/testing';
import { FreeService } from './free.service';

describe('FreeService', () => {
  let service: FreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeService],
    }).compile();

    service = module.get<FreeService>(FreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
