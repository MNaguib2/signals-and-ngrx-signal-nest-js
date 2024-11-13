import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundRouteController } from './not-found-route.controller';

describe('NotFoundRouteController', () => {
  let controller: NotFoundRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotFoundRouteController],
    }).compile();

    controller = module.get<NotFoundRouteController>(NotFoundRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
