import { Test, TestingModule } from '@nestjs/testing';
import { PotsController } from './pots.controller';

describe('PotsController', () => {
  let controller: PotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotsController],
    }).compile();

    controller = module.get<PotsController>(PotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
