import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { Cliente } from './dto/cliente.dto';
import { Clientes } from './entities/cliente.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ConteinerService} from '../conteiner/conteiner.service';
import { MovimentacaoService} from '../movimentacao/movimentacao.service';
import { ConteinerModule } from 'src/conteiner/conteiner.module';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Clientes)
    private clienteRepository: typeof Clientes,
    @Inject(forwardRef(() => ConteinerService))
    private conteinerService: ConteinerService,
    private movimentacaoService: MovimentacaoService 
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
    if(cliente.codigo != Cliente.codigo){
      this.updateCodigo(Cliente.codigo);
    }
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

  async updateCodigo(codigo: string ){
    await this.conteinerService.updateByCodigo(codigo);
    await this.movimentacaoService.updateByCodigo(codigo);
  }
}
