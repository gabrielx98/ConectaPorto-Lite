import { Test, TestingModule } from '@nestjs/testing';
import { ConteinerController } from './conteiner.controller';
import { ConteinerService } from './conteiner.service';

const mockConteinerService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByClient: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

const conteiner = { 
  id: 1, 
  codigo: 'ABC1234567', 
  categoria: 'Importação', 
  clienteId: 1, 
  tamanho: '20 PÉS', 
  estado: 'VAZIO' 
};

describe('ConteinerController', () => {
  let controller: ConteinerController;
  let service: ConteinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConteinerController],
      providers: [
        { provide: ConteinerService, useValue: mockConteinerService}
      ],
    }).compile();

    controller = module.get<ConteinerController>(ConteinerController);
    service = module.get<ConteinerService>(ConteinerService);
  });

  it('verificar existencia da controller', () => {
    expect(controller).toBeDefined();
  });

  it('cadastrar container', async () => {
    mockConteinerService.create.mockResolvedValue(conteiner);
    expect(await controller.create(conteiner)).toBe(conteiner);
  });

  it('lista de conteineres', async () => {
    mockConteinerService.findAll.mockResolvedValue([conteiner]);
    expect(await controller.findAll()).toStrictEqual([conteiner]);
  });

  it('buscar container pelo id do cliente', async () => {
    mockConteinerService.findByClient.mockResolvedValue(conteiner);
    expect(await controller.findByClient(conteiner.clienteId.toString())).toBe(conteiner);
  });

  it('buscar container pelo id', async () => {
  mockConteinerService.findOne.mockResolvedValue(conteiner);
  expect(await controller.findOne(conteiner.id.toString())).toBe(conteiner);
});

it('should update a container', async () => {
  mockConteinerService.update.mockResolvedValue(conteiner);
  expect(await controller.update(conteiner)).toEqual(conteiner);
});

it('remover container', async () => {
  mockConteinerService.remove.mockResolvedValue(conteiner);
  expect(await controller.remove(conteiner.id.toString())).toBe(conteiner);
});
});
