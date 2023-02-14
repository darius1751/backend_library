import { Test, TestingModule } from '@nestjs/testing';
import { CopyBookController } from './copy-book.controller';
import { CopyBookService } from './copy-book.service';

describe('CopyBookController', () => {
  let controller: CopyBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CopyBookController],
      providers: [CopyBookService],
    }).compile();

    controller = module.get<CopyBookController>(CopyBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
