import { Injectable } from '@nestjs/common';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';
//import { ConteinerService } from '../conteiner/conteiner.service';
import { Conteineres } from '../conteiner/entities/conteiner.entity';
import { Op } from 'sequelize';

@Injectable()
export class MovimentacaoService {
  constructor(
    @InjectModel(Movimentacoes)
    private movimentacaoRepository: typeof Movimentacoes,
    @InjectModel(Conteineres)
    private conteinerRepository: typeof Conteineres
  ) {}

  async create(NewMovimentacao: MovimentacaoModel) {
    const conteiner = await this.conteinerRepository.findByPk(NewMovimentacao.conteinerId);
    NewMovimentacao.codigo = conteiner.codigo + "_" + Date.now().toString();
    return await this.movimentacaoRepository.create(Movimentacao.fromModel(NewMovimentacao) as any)
    .catch(erro => {
      return erro;
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

  async findUnitAll(id: number) {
    return await this.movimentacaoRepository.findAll({
      where: {
        conteinerId: id
      }, 
      order: [['updatedAt','DESC']]
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Busca!")
    });
  }

  async findLastUpdate(id?: number) {
    const whereClause = id ? { clienteId: id } : {};
    return await this.movimentacaoRepository.findOne({
      where: whereClause,
      order: [['updatedAt', 'DESC']]
    })
    .catch(erro => {
      return erro;
    }).finally(() => {
      console.log("Fim da consulta");
    });
  }

  async update(Model: MovimentacaoModel) {
    var Movimentacao = Movimentacao.fromModel(Model);
    var id = Movimentacao.id;
    var movimentacao = await this.movimentacaoRepository.findByPk(id);
    if(movimentacao.conteinerId != Movimentacao.conteinerId.toString()){
      const newConteiner = await this.conteinerRepository.findByPk(Movimentacao.conteinerId);
      const oldConteiner = await this.conteinerRepository.findByPk(movimentacao.conteinerId);
      Movimentacao.codigo = Movimentacao.codigo.replace(oldConteiner.codigo, newConteiner.codigo);
    }
    await movimentacao.update(Movimentacao, {
      where: {id},
      returning: true,
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Atualização!")
    });
    return Movimentacao;
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

  async updateByCodigo(newCodigo: string, oldCodigo: string) {
    const movimentacoes = await this.movimentacaoRepository.findAll({
      where: { codigo: { [Op.like]: `${oldCodigo}%` } }
    });

    for (const movimentacao of movimentacoes) {
      movimentacao.codigo = newCodigo + movimentacao.codigo.slice(3);
      await movimentacao.save();
    }

    return movimentacoes;
  }
}
