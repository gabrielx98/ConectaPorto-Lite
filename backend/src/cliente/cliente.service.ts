import { Injectable } from '@nestjs/common';
import { Cliente } from './dto/cliente.dto';
import { Clientes } from './entities/cliente.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Clientes)
    private clienteRepository: typeof Clientes,
  ) {}


  async create(Cliente: Cliente) {
    return await this.clienteRepository.create(Cliente as any);
  }

  async findAll() {
    return await this.clienteRepository.findAll()
    .catch(erro => {
      return erro;
    });
  }

  async findOne(id: number) {
    return await this.clienteRepository.findByPk(id)
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Busca!")
    });
  }

  async update(Cliente: Cliente) {
    var id = Cliente.id;
    var cliente = await this.clienteRepository.findByPk(id);
    return await cliente.update(Cliente, {
      where: {id},
      returning: true,
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Atualização!")
    });
  }

  async remove(id: number) {
    return await this.clienteRepository.destroy({
      where: {id},
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Remoção!")
    });
  }
}
