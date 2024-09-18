import { Module } from '@nestjs/common';
import { ConteinerService } from './conteiner.service';
import { ConteinerController } from './conteiner.controller';
import { Conteineres } from './entities/conteiner.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Conteineres])],
  controllers: [ConteinerController],
  providers: [ConteinerService],
})
export class ConteinerModule {}
