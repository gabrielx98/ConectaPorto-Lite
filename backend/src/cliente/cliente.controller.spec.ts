import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './dto/cliente.dto';

const mockClienteService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

const cliente: Cliente = { 
  id: 1, 
  codigo: 'ITC', 
  nome: 'Internacional Tecnology Company'
};

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        { provide: ClienteService, useValue: mockClienteService}
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);

  });

  it('verificar existencia da controller', () => {
    expect(controller).toBeDefined();
  });

   it('cadastrar cliente', async () => {
    mockClienteService.create.mockResolvedValue(cliente);
    expect(await controller.create(cliente)).toBe(cliente);
  });

  it('lista de clientes', async () => {
    mockClienteService.findAll.mockResolvedValue([cliente]);
    expect(await controller.findAll()).toStrictEqual([cliente]);
  });

  it('buscar cliente pelo id', async () => {
    mockClienteService.findOne.mockResolvedValue(cliente);
    expect(await controller.findOne(cliente.id.toString())).toBe(cliente);
    });
    
  it('atualizar cliente', async () => {
  mockClienteService.update.mockResolvedValue(cliente);
  expect(await controller.update(cliente)).toEqual(cliente);
  });
      
      
  it('remover cliente', async () => {
    mockClienteService.remove.mockResolvedValue(cliente);
    expect(await controller.remove(cliente.id.toString())).toBe(cliente);
  }); 
});
