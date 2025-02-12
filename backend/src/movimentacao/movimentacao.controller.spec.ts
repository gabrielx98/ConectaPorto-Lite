import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoController } from './movimentacao.controller';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';
import { mock } from 'node:test';

const mockMovimentacaoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findLastUpdate: jest.fn(),
  findOne: jest.fn(),
  findUnitAll: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

const movimentacao: Movimentacao = { 
  id: 1, 
  codigo: 'ABC0000001_1734548042806', 
  categoria: 'GATE IN', 
  clienteId: 1, 
  conteinerId: 1, 
  dataInicio: new Date(), 
  dataFim: new Date()
};

const movimentacaoModel: MovimentacaoModel = {
  id: 1,
  codigo: 'ABC0000001_1734548042806',
  categoria: 'GATE IN',
  clienteId: 1,
  conteinerId: 1,
  dataInicio: new Date().toISOString(),
  dataFim: new Date().toISOString(),
};

describe('MovimentacaoController', () => {
  let controller: MovimentacaoController;
  let service: MovimentacaoService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentacaoController],
      providers: [
        { provide: MovimentacaoService, useValue: mockMovimentacaoService}
      ],
    }).compile();

    controller = module.get<MovimentacaoController>(MovimentacaoController);
    service = module.get<MovimentacaoService>(MovimentacaoService);

  });

  it('verificar existencia da controller', () => {
    expect(controller).toBeDefined();
  });

  it('should create a movimentacao', async () => {
    mockMovimentacaoService.create.mockResolvedValue(movimentacao);
    expect(await controller.create(movimentacaoModel)).toBe(movimentacao);
  });

  it('listar movimentacoes', async () => {
    mockMovimentacaoService.findAll.mockResolvedValue([movimentacao]);
    expect(await controller.findAll()).toStrictEqual([movimentacao]);
  });

  it('retorna as ultimas atualizações das movimentações', async () => {
    mockMovimentacaoService.findLastUpdate.mockResolvedValue(movimentacao);
    expect(await controller.findNow()).toBe(movimentacao);
  });

  it('retorna as ultimas atualizações das movimentações pelo id do cliente', async () => {
    mockMovimentacaoService.findLastUpdate.mockResolvedValue(movimentacao);
    expect(await controller.findNowClient(movimentacao.clienteId.toString())).toBe(movimentacao);
  });

  it('buscar movimentacao pelo id', async () => {
    mockMovimentacaoService.findOne.mockResolvedValue(movimentacao);
    expect(await controller.findOne(movimentacao.id.toString())).toBe(movimentacao);
  });

  it('buscar movimentacoes pelo id do conteiner', async () => {
    mockMovimentacaoService.findUnitAll.mockResolvedValue([movimentacao]);
    expect(await controller.findByConteiner(movimentacao.id.toString())).toEqual([movimentacao]);
  });

  it('atualizar movimentacao', async () => {
    mockMovimentacaoService.update.mockResolvedValue(movimentacao);
    expect(await controller.update(movimentacao)).toBe(movimentacao);
  });

  it('remover movimentacao', async () => {
    mockMovimentacaoService.remove.mockResolvedValue(movimentacao);
    expect(await controller.remove(movimentacao.id.toString())).toBe(movimentacao);
  });
});
