import { Module } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';
import { ConteinerModule } from 'src/conteiner/conteiner.module';

@Module({
  imports: [SequelizeModule.forFeature([Movimentacoes]), ConteinerModule],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
})
export class MovimentacaoModule {}
