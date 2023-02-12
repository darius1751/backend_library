import { Test, TestingModule } from '@nestjs/testing';
import { CopyBookStateService } from './copy-book-state.service';

describe('CopyBookStateService', () => {
  let service: CopyBookStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CopyBookStateService],
    }).compile();

    service = module.get<CopyBookStateService>(CopyBookStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
