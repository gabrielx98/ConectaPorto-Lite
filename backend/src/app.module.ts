import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize'; 
import { ConteinerModule } from './conteiner/conteiner.module';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';

@Module({
  imports: [ SequelizeModule.forRoot(dataBaseConfig), ClienteModule, ConteinerModule, MovimentacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
