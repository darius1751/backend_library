import { Test, TestingModule } from '@nestjs/testing';
import { CopyBookStateController } from './copy-book-state.controller';
import { CopyBookStateService } from './copy-book-state.service';

describe('CopyBookStateController', () => {
  let controller: CopyBookStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CopyBookStateController],
      providers: [CopyBookStateService],
    }).compile();

    controller = module.get<CopyBookStateController>(CopyBookStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
