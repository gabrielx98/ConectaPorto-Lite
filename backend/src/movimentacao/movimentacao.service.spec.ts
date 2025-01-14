import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoService } from './movimentacao.service';
import { getModelToken } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';
import { ConteinerService } from '../conteiner/conteiner.service';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';


describe('MovimentacaoService', () => {
  let service: MovimentacaoService;
  let model: typeof Movimentacoes;
  let conteinerService: ConteinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimentacaoService,
        {
          provide: getModelToken(Movimentacoes),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
            destroy: jest.fn(),
            sequelize: {
              query: jest.fn(),
            },
          },
        },
        {
          provide: ConteinerService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovimentacaoService>(MovimentacaoService);
    model = module.get<typeof Movimentacoes>(getModelToken(Movimentacoes));
    conteinerService = module.get<ConteinerService>(ConteinerService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movimentacao', async () => {
    const movimentacaoDto: MovimentacaoModel = { 
      id: 1, 
      codigo: 'ABC123', 
      categoria: 'categoria', 
      clienteId: 1, 
      conteinerId: 1, 
      dataInicio: new Date().toISOString(), 
      dataFim: new Date().toISOString() 
    };
    const conteiner = { codigo: 'ABC123' };
    jest.spyOn(conteinerService, 'findOne').mockResolvedValue(conteiner as any);
    jest.spyOn(model, 'create').mockResolvedValue(movimentacaoDto as any);
    expect(await service.create(movimentacaoDto)).toBe(movimentacaoDto);
  });

  it('should return an array of movimentacoes', async () => {
    const result = ['test'];
    jest.spyOn(model, 'findAll').mockResolvedValue(result as any);
    expect(await service.findAll()).toBe(result);
  });

  it('should return a movimentacao by id', async () => {
    const result = 'test';
    jest.spyOn(model, 'findByPk').mockResolvedValue(result as any);
    expect(await service.findOne(1)).toBe(result);
  });

  it('should return movimentacoes by conteiner id', async () => {
    const result = ['test'];
    jest.spyOn(model, 'findAll').mockResolvedValue(result as any);
    expect(await service.findUnitAll(1)).toBe(result);
  });

  it('should return the last updated movimentacao', async () => {
    const result = ['test'];
    jest.spyOn(model.sequelize, 'query').mockResolvedValue(result as any);
    expect(await service.findLastUpdate()).toBe(result);
  });

  it('should return the last updated movimentacao for a client', async () => {
    const result = ['test'];
    jest.spyOn(model.sequelize, 'query').mockResolvedValue(result as any);
    expect(await service.findLastUpdate(1)).toBe(result);
  });

  it('should update a movimentacao', async () => {
    const movimentacaoDto: Movimentacao = { 
      id: 1, 
      codigo: 'updated', 
      categoria: 'categoria', 
      clienteId: 1, 
      conteinerId: 1, 
      dataInicio: new Date(), 
      dataFim: new Date() 
    };
    const updatedMovimentacao = { ...movimentacaoDto, codigo: 'updated' };
    jest.spyOn(model, 'findByPk').mockResolvedValue({
      update: jest.fn().mockResolvedValue(updatedMovimentacao),
    } as any);
    expect(await service.update(movimentacaoDto)).toBe(updatedMovimentacao);
  });

  it('should remove a movimentacao', async () => {
    const result = 1;
    jest.spyOn(model, 'destroy').mockResolvedValue(result as any);
    expect(await service.remove(1)).toBe(result);
  });
});
