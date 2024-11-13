import { Test, TestingModule } from '@nestjs/testing';
import { LoginUsersController } from './login-users.controller';

describe('LoginUsersController', () => {
  let controller: LoginUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginUsersController],
    }).compile();

    controller = module.get<LoginUsersController>(LoginUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
