import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoController } from './movimentacao.controller';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';

describe('MovimentacaoController', () => {
  let controller: MovimentacaoController;
  let service: MovimentacaoService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentacaoController],
      providers: [
        {
          provide: MovimentacaoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findLastUpdate: jest.fn(),
            findOne: jest.fn(),
            findUnitAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovimentacaoController>(MovimentacaoController);
    service = module.get<MovimentacaoService>(MovimentacaoService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a movimentacao', async () => {
    const movimentacaoDto: MovimentacaoModel = {
      id: 1,
      codigo: 'ABC123',
      categoria: 'categoria1',
      clienteId: 1,
      dataInicio: new Date().toISOString(),
      dataFim: new Date().toISOString(),
      conteinerId: 1
    };
    jest.spyOn(service, 'create').mockResolvedValue('someValue');
    expect(await controller.create(movimentacaoDto)).toBe('someValue');
  });

  it('should return an array of movimentacoes', async () => {
    const result = ['test'];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return the last updated movimentacao', async () => {
    const result = 'test';
    jest.spyOn(service, 'findLastUpdate').mockResolvedValue(result);
    expect(await controller.findNow()).toBe(result);
  });

  it('should return the last updated movimentacao for a client', async () => {
    const result = 'test';
    jest.spyOn(service, 'findLastUpdate').mockResolvedValue(result);
    expect(await controller.findNowClient('1')).toBe(result);
  });

  it('should return a movimentacao by id', async () => {
    const result = 'test';
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('should return movimentacoes by conteiner id', async () => {
    const result = ['test'];
    jest.spyOn(service, 'findUnitAll').mockResolvedValue(result);
    expect(await controller.findByConteiner('1')).toBe(result);
  });

  it('should update a movimentacao', async () => {
    const movimentacaoDto: Movimentacao = {
      id: 1,
      codigo: 'ABC123',
      categoria: 'categoria1',
      clienteId: 1,
      dataInicio: new Date(),
      dataFim: new Date(),
      conteinerId: 1
    };
    jest.spyOn(service, 'update').mockResolvedValue('someValue');
    expect(await controller.update(movimentacaoDto)).toBe('someValue');
  });

  it('should remove a movimentacao', async () => {
    const result = 'test';
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await controller.remove('1')).toBe(result);
  });
});
