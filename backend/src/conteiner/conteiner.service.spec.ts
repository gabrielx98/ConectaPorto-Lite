import { Test, TestingModule } from '@nestjs/testing';
import { ConteinerService } from './conteiner.service';
import { getModelToken } from '@nestjs/sequelize';
import { Conteineres } from './entities/conteiner.entity';
import { ClienteService } from '../cliente/cliente.service';
import { mock } from 'node:test';

const mockConteinerRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const conteiner = { 
  id: 1, 
  codigo: 'ABC1234567', 
  categoria: 'Importação', 
  clienteId: 1, 
  tamanho: '20 PÉS', 
  estado: 'VAZIO' 
};

describe('ConteinerService', () => {
  let service: ConteinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConteinerService,
        { provide: getModelToken(Conteineres), useValue: mockConteinerRepository },
      ],
    }).compile();

    service = module.get<ConteinerService>(ConteinerService);
  });

  it('verificar existencia de serviço', () => {
    expect(service).toBeDefined();
  });

  it('cadastro de container', async () => {
    mockConteinerRepository.create.mockResolvedValue(conteiner);
    expect(await service.create(conteiner)).toBe(conteiner);
  });

  it('lista de containers', async () => {
    mockConteinerRepository.findAll.mockResolvedValue([conteiner]);
    expect(await service.findAll()).toEqual([conteiner]);
  });

  it('buscar container pelo id', async () => {
    mockConteinerRepository.findByPk.mockResolvedValue(conteiner);
    expect(await service.findOne(conteiner.id)).toBe(conteiner);
  });
  
  it('buscar conteineres pelo id do cliente', async () => {
    mockConteinerRepository.findAll.mockResolvedValue(conteiner);
    expect(await service.findByClient(conteiner.clienteId)).toEqual(conteiner);
  });

  it('atualizar container', async () => {
    const updatedConteiner = { ...conteiner, estado: 'CHEIO'};
    mockConteinerRepository.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(updatedConteiner),
    });
    expect(await service.update(updatedConteiner)).toEqual(updatedConteiner);
  });
  
  it('remover container', async () => {
    mockConteinerRepository.destroy.mockResolvedValue(conteiner);
    expect(await service.remove(conteiner.id)).toBe(conteiner);
  });

});
