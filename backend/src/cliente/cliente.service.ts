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
    var cliente = await this.clienteRepository.findByPk(Cliente.id);
    
    if(Cliente?.codigo != cliente?.codigo){
      this.updateCodigo(Cliente.codigo, cliente?.codigo);
    }
    await cliente.update(Cliente).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Atualização!")
    });
    return Cliente;
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

  async updateCodigo(newCodigo: string, oldCodigo: string){
    await this.conteinerService.updateByCodigo(newCodigo, oldCodigo);
    await this.movimentacaoService.updateByCodigo(newCodigo, oldCodigo);
  }
}
