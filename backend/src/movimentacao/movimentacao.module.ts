import { Module } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';
import { Conteineres } from '../conteiner/entities/conteiner.entity';

@Module({
  imports: [SequelizeModule.forFeature([Movimentacoes, Conteineres])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
  exports: [MovimentacaoService]
})
export class MovimentacaoModule {}
