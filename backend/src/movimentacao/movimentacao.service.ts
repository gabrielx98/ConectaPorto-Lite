import { Injectable } from '@nestjs/common';
import { Movimentacao } from './dto/movimentacao.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';

@Injectable()
export class MovimentacaoService {
  constructor(
    @InjectModel(Movimentacoes)
    private movimentacaoRepository: typeof Movimentacoes,
  ) {}

  async create(Movimentacao: Movimentacao) {
    return await this.movimentacaoRepository.create(Movimentacao as any)
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim do Cadastro!")
    });
  }

  async findAll() {
    return await this.movimentacaoRepository.findAll()
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Listagem!")
    });
  }

  async findOne(id: number) {
    return await this.movimentacaoRepository.findByPk(id)
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Busca!")
    });
  }

  async update(Movimentacao: Movimentacao) {
    var id = Movimentacao.id;
    var movimentacao = await this.movimentacaoRepository.findByPk(id);
    return await movimentacao.update(Movimentacao, {
      where: {id},
      returning: true,
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Atualização!")
    });
  }

  async remove(id: number) {
    return await this.movimentacaoRepository.destroy({
      where: {id},
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Remoção!")
    });
  }
}
