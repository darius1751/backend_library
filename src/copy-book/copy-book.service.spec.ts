import { Test, TestingModule } from '@nestjs/testing';
import { CopyBookService } from './copy-book.service';

describe('CopyBookService', () => {
  let service: CopyBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CopyBookService],
    }).compile();

    service = module.get<CopyBookService>(CopyBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
