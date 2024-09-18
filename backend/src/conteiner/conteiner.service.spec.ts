import { Test, TestingModule } from '@nestjs/testing';
import { ConteinerService } from './conteiner.service';

describe('ConteinerService', () => {
  let service: ConteinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConteinerService],
    }).compile();

    service = module.get<ConteinerService>(ConteinerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
