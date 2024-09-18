import { Injectable } from '@nestjs/common';
import { Conteiner } from './dto/conteiner.dto';
import { Conteineres } from './entities/conteiner.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ConteinerService {
  constructor(
    @InjectModel(Conteineres)
    private conteinerRepository: typeof Conteineres,
  ) {}

  async create(Conteiner: Conteiner) {
    return await this.conteinerRepository.create(Conteiner as any)
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim do Cadastro!")
    });
  }

  async findAll() {
    return await this.conteinerRepository.findAll()
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Listagem!")
    });
  }

  async findOne(id: number) {
    return await this.conteinerRepository.findByPk(id)
    .catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Busca!")
    });
  }

  async update(Conteiner: Conteiner) {
    var id = Conteiner.id;
    var conteiner = await this.conteinerRepository.findByPk(id);
    return await conteiner.update(Conteiner, {
      where: {id},
      returning: true,
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Atualização!")
    });
  }

  async remove(id: number) {
    return await this.conteinerRepository.destroy({
      where: {id},
    }).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Remoção!")
    });
  }
}
