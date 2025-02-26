import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoService } from './movimentacao.service';
import { getModelToken } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';
import { Conteineres } from '../conteiner/entities/conteiner.entity';

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

const conteiner = { 
  id: 1, 
  codigo: 'ABC1234567', 
  categoria: 'Importação', 
  clienteId: 1, 
  tamanho: '20 PÉS', 
  estado: 'VAZIO' 
};

const mockConteinerRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn()
};

const mockMovimentacaoRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findOne: jest.fn()
};

describe('MovimentacaoService', () => {
  let service: MovimentacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimentacaoService,
        { provide: getModelToken(Movimentacoes), useValue: mockMovimentacaoRepository },
        { provide: getModelToken(Conteineres), useValue: mockConteinerRepository }
      ], 
    }).compile();

    service = module.get<MovimentacaoService>(MovimentacaoService);

  });

  it('verificar existencia de serviço', () => {
    expect(service).toBeDefined();
  });

  it('cadastar movimentacao', async () => {
    mockConteinerRepository.findByPk.mockResolvedValue(conteiner);
    mockMovimentacaoRepository.create.mockResolvedValue(movimentacao);
    expect(await service.create(movimentacaoModel)).toBe(movimentacao);
  });

  it('listar movimentacoes', async () => {
    mockMovimentacaoRepository.findAll.mockResolvedValue([movimentacao]);
    expect(await service.findAll()).toEqual([movimentacao]);
  });

  it('buscar movimentacao pelo id', async () => {
    mockMovimentacaoRepository.findByPk.mockResolvedValue(movimentacao);
    expect(await service.findOne(movimentacao.id)).toBe(movimentacao);
  });

  it('buscar movimentacoes pelo id do conteiner', async () => {
    mockMovimentacaoRepository.findAll.mockResolvedValue(movimentacao);
    expect(await service.findUnitAll(movimentacao.conteinerId)).toBe(movimentacao);
  }); 

  it('retorna as ultimas atualizações das movimentações pelo id do cliente', async () => {
    mockMovimentacaoRepository.findOne.mockResolvedValue(movimentacao);
    expect(await service.findLastUpdate(movimentacao.clienteId)).toBe(movimentacao);
  });

  it('atualizar movimentacao', async () => {
    const updatedMovimentacao = { ...movimentacao, categoria: 'GATE OUT'};
    mockConteinerRepository.findByPk.mockResolvedValue(conteiner);
    mockMovimentacaoRepository.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(movimentacao),
    });
    expect(await service.update(updatedMovimentacao)).toEqual(updatedMovimentacao);
  }); 

  it('remover movimentacao', async () => {
    mockMovimentacaoRepository.destroy.mockResolvedValue(movimentacao);
    expect(await service.remove(movimentacao.id)).toBe(movimentacao);
  });
});
