import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Conteiner } from './dto/conteiner.dto';
import { Conteineres } from './entities/conteiner.entity';

import { InjectModel } from '@nestjs/sequelize';

import { Op } from 'sequelize';

@Injectable()
export class ConteinerService {
  constructor(
    @InjectModel(Conteineres)
    private readonly conteinerRepository: typeof Conteineres,
    
  ) {}

  async create(Conteiner: Conteiner) {
    return await this.conteinerRepository.create(Conteiner as any)
  }

  async findAll() {
    return await this.conteinerRepository.findAll()
    .catch(erro => {
      return erro;
    });
    
  }

   async findByClient(clientId: number) {
    return await this.conteinerRepository.findAll({
      where: {
        clienteId: clientId
      }
    }).catch(erro => {
      return erro;
    }).finally ( () => {
      console.log("Fim de Consulta");
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

  async updateByCodigo(newCodigo: string, oldCodigo: string){
    const conteineres = await this.conteinerRepository.findAll({
      where: {
        codigo: {
          [Op.like]: `${oldCodigo}%`
        }
      }
    });

    for (const conteiner of conteineres) {
      conteiner.codigo = newCodigo + conteiner.codigo.slice(3);
      await conteiner.save();
    }
  }
}
