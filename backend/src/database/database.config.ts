import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Clientes } from 'src/cliente/entities/cliente.entity';
import { Conteineres } from 'src/conteiner/entities/conteiner.entity';
import { Movimentacoes } from 'src/movimentacao/entities/movimentacao.entity';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: '.db/data.sqlite3',
  models: [Clientes, Conteineres, Movimentacoes],
  autoLoadModels: true,
  synchronize: true,
};