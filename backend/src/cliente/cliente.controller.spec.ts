import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './dto/cliente.dto';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a client', async () => {
    const clienteDto: Cliente = { id: 1, codigo: '123', nome: 'Test Client' };
    const createdCliente = { ...clienteDto, conteineres: [], $add: jest.fn(), $set: jest.fn(), $get: jest.fn() };
    jest.spyOn(service, 'create').mockResolvedValue(createdCliente as any);
    expect(await controller.create(clienteDto)).toBe(createdCliente);
  });

  it('should return an array of clients', async () => {
    const result = ['test'];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a client by id', async () => {
    const result = 'test';
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('should update a client', async () => {
    const clienteDto: Cliente = { id: 1, codigo: '123', nome: 'Updated Client' };
    jest.spyOn(service, 'update').mockResolvedValue('someValue');
    expect(await controller.update(clienteDto)).toBe('someValue');
  });

  it('should remove a client', async () => {
    const result = 'test';
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await controller.remove('1')).toBe(result);
  });
});
