import { Test, TestingModule } from '@nestjs/testing';
import { ConteinerService } from './conteiner.service';
import { getModelToken } from '@nestjs/sequelize';
import { Conteineres } from './entities/conteiner.entity';
import { ClienteService } from '../cliente/cliente.service';

const mockConteinerRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const mockClienteService = {
  findOne: jest.fn(),
};

describe('ConteinerService', () => {
  let service: ConteinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConteinerService,
        { provide: getModelToken(Conteineres), useValue: mockConteinerRepository },
        { provide: ClienteService, useValue: mockClienteService },
      ],
    }).compile();

    service = module.get<ConteinerService>(ConteinerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a container', async () => {
    const conteiner = { id: 1, name: 'Test Conteiner', codigo: 'C123', categoria: 'A', clienteId: 1, tamanho: '20', estado: 'Ativo' };
    mockConteinerRepository.create.mockResolvedValue(conteiner);
    expect(await service.create(conteiner)).toEqual(conteiner);
  });

  it('should find all containers', async () => {
    const conteineres = [{ id: 1, name: 'Test Conteiner' }];
    mockConteinerRepository.findAll.mockResolvedValue(conteineres);
    expect(await service.findAll()).toEqual(conteineres);
  });

  it('should find a container by id', async () => {
    const conteiner = { id: 1, name: 'Test Conteiner' };
    mockConteinerRepository.findByPk.mockResolvedValue(conteiner);
    expect(await service.findOne(1)).toEqual(conteiner);
  });

  it('should update a container', async () => {
    const conteiner = { id: 1, name: 'Updated Conteiner', codigo: 'C123', categoria: 'A', clienteId: 1, tamanho: '20', estado: 'Ativo' };
    mockConteinerRepository.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(conteiner),
    });
    expect(await service.update(conteiner)).toEqual(conteiner);
  });

  it('should remove a container', async () => {
    mockConteinerRepository.destroy.mockResolvedValue(1);
    expect(await service.remove(1)).toEqual(1);
  });

  it('should find containers by client id', async () => {
    const conteineres = [{ id: 1, name: 'Test Conteiner', clienteId: 1 }];
    mockConteinerRepository.findAll.mockResolvedValue(conteineres);
    expect(await service.findByClient(1)).toEqual(conteineres);
  });
});
