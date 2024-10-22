import { Module } from '@nestjs/common';
import { ConteinerService } from './conteiner.service';
import { ConteinerController } from './conteiner.controller';
import { Conteineres } from './entities/conteiner.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [SequelizeModule.forFeature([Conteineres]), ClienteModule],
  controllers: [ConteinerController],
  providers: [ConteinerService],
  exports: [ConteinerService]
})
export class ConteinerModule {}
