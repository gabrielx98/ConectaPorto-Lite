import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';

import { getModelToken } from '@nestjs/sequelize';
import { Clientes } from './entities/cliente.entity';
import { Cliente } from './dto/cliente.dto';
import { ConteinerService } from '../conteiner/conteiner.service';
import { MovimentacaoService } from '../movimentacao/movimentacao.service';

const mockClienteRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const mockConteinerService = {
  updateByCodigo: jest.fn(),
};

const mockMovimentacaoService = {
  updateByCodigo: jest.fn(),
};

const cliente: Cliente = 
  { 
    id: 1, 
    codigo: "ITC", 
    nome: 'Internacional Tecnology Company' 
  };

describe('ClienteService', () => {
  let service: ClienteService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,

        { provide: getModelToken(Clientes), useValue: mockClienteRepository },
        { provide: ConteinerService, useValue: mockConteinerService},
        { provide: MovimentacaoService, useValue: mockMovimentacaoService},
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    
  });

  it('verificar existencia de serviço', () => {
    expect(service).toBeDefined();
  });

   it('cadastro de cliente', async () => {
    mockClienteRepository.create.mockResolvedValue(cliente);
    expect(await service.create(cliente)).toBe(cliente);
  });

  
  it('lista de clientes', async () => {
    mockClienteRepository.findAll.mockResolvedValue([cliente]);
    expect(await service.findAll()).toEqual([cliente]);
  });

  it('buscar cliente pelo id', async () => {
    mockClienteRepository.findByPk.mockResolvedValue(cliente);
    expect(await service.findOne(cliente.id)).toBe(cliente);
  });

  it('atualizar cliente', async () => {
    const updatedCliente = { ...cliente, nome: 'Internacional Tecnology Cybersecurity', codigo: 'ITS' };
    mockClienteRepository.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(cliente),
    });
    expect((await service.update(updatedCliente))).toEqual(updatedCliente);
  });

  it('remover cliente', async () => {
    mockClienteRepository.destroy.mockResolvedValue(cliente);
    expect(await service.remove(cliente.id)).toBe(cliente);
  });
});
