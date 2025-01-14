import { Test, TestingModule } from '@nestjs/testing';
import { ConteinerController } from './conteiner.controller';
import { ConteinerService } from './conteiner.service';
import { Conteiner } from './dto/conteiner.dto';

describe('ConteinerController', () => {
  let controller: ConteinerController;
  let service: ConteinerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConteinerController],
      providers: [
        {
          provide: ConteinerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByClient: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConteinerController>(ConteinerController);
    service = module.get<ConteinerService>(ConteinerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a container', async () => {
    const conteinerDto: Conteiner = {
      id: 1,
      codigo: 'ABC123',
      categoria: 'General',
      clienteId: 1,
      tamanho: '20ft',
      estado: 'Active'
    };
    const createdConteiner = { ...conteinerDto, cliente: {}, $add: jest.fn(), $set: jest.fn(), $get: jest.fn() };
    jest.spyOn(service, 'create').mockResolvedValue(createdConteiner as any);
    expect(await controller.create(conteinerDto)).toBe(createdConteiner);
  });

  it('should return an array of containers', async () => {
    const result = ['test'];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a container by client id', async () => {
    const result = 'test';
    jest.spyOn(service, 'findByClient').mockResolvedValue(result);
    expect(await controller.findByClient('1')).toBe(result);
  });

  it('should return a container by id', async () => {
  const result = 'test';
  jest.spyOn(service, 'findOne').mockResolvedValue(result);
  expect(await controller.findOne('1')).toBe(result);
});

it('should update a container', async () => {
  const conteinerDto: Conteiner = {
    id: 1,
    codigo: 'ABC123',
    categoria: 'General',
    clienteId: 1,
    tamanho: '20ft',
    estado: 'Active'
  };
  jest.spyOn(service, 'update').mockResolvedValue('someValue');
  expect(await controller.update(conteinerDto)).toBe('someValue');
});

it('should remove a container', async () => {
  const result = 'test';
  jest.spyOn(service, 'remove').mockResolvedValue(result);
  expect(await controller.remove('1')).toBe(result);
});
});
