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
    //private conteinerService: ConteinerService
    @InjectModel(Conteineres)
    private conteinerRepository: typeof Conteineres
  ) {}

  async create(NewMovimentacao: MovimentacaoModel) {
    const conteiner = await this.conteinerRepository.findByPk(NewMovimentacao.conteinerId);
    //const conteiner =  await this.conteinerService.findOne(NewMovimentacao.conteinerId);
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
    //const conteiner =  await this.conteinerService.findOne(id);
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
    let query = 'SELECT * FROM Movimentacoes m INNER JOIN (SELECT id,MAX(updatedAt) as maxDataAtualizacao FROM Movimentacoes ';
    if (id){
      query += `WHERE clienteId = ${id} `;
    }
    query += 'GROUP BY id) as ultimas ON m.id = ultimas.id AND m.updatedAt = ultimas.maxDataAtualizacao';

    return await this.movimentacaoRepository.sequelize.query(query)
    .catch(erro => {
      return erro;
    }).finally(() => {
      console.log("Fim da consulta")
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
