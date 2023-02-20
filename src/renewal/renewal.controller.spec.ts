import { Test, TestingModule } from '@nestjs/testing';
import { RenewalController } from './renewal.controller';
import { RenewalService } from './renewal.service';

describe('RenewalController', () => {
  let controller: RenewalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenewalController],
      providers: [RenewalService],
    }).compile();

    controller = module.get<RenewalController>(RenewalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
