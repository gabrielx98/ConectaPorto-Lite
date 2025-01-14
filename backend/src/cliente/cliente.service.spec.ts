import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';

import { getModelToken } from '@nestjs/sequelize';
import { Clientes } from './entities/cliente.entity';
import { Cliente } from './dto/cliente.dto';

describe('ClienteService', () => {
  let service: ClienteService;
  let model: typeof Clientes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getModelToken(Clientes),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    model = module.get<typeof Clientes>(getModelToken(Clientes));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const clienteDto: Cliente = { id: 1, codigo: '123', nome: 'Test Client' };
    jest.spyOn(model, 'create').mockResolvedValue(clienteDto as any);
    expect(await service.create(clienteDto)).toBe(clienteDto);
  });

  it('should return an array of clients', async () => {
    const result = ['test'];
    jest.spyOn(model, 'findAll').mockResolvedValue(result as any);
    expect(await service.findAll()).toBe(result);
  });

  it('should return a client by id', async () => {
    const result = 'test';
    jest.spyOn(model, 'findByPk').mockResolvedValue(result as any);
    expect(await service.findOne(1)).toBe(result);
  });

  it('should update a client', async () => {
    const clienteDto: Cliente = { id: 1, codigo: '123', nome: 'Updated Client' };
    const updatedCliente = { ...clienteDto, name: 'updated' };
    jest.spyOn(model, 'findByPk').mockResolvedValue({
      update: jest.fn().mockResolvedValue(updatedCliente),
    } as any);
    expect(await service.update(clienteDto)).toBe(updatedCliente);
  });

  it('should remove a client', async () => {
    const result = 1;
    jest.spyOn(model, 'destroy').mockResolvedValue(result as any);
    expect(await service.remove(1)).toBe(result);
  });
});
