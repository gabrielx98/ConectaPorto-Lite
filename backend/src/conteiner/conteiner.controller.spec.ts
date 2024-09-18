import { Test, TestingModule } from '@nestjs/testing';
import { ConteinerController } from './conteiner.controller';
import { ConteinerService } from './conteiner.service';

describe('ConteinerController', () => {
  let controller: ConteinerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConteinerController],
      providers: [ConteinerService],
    }).compile();

    controller = module.get<ConteinerController>(ConteinerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
