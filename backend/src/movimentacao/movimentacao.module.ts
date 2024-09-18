import { Module } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movimentacoes } from './entities/movimentacao.entity';

@Module({
  imports: [SequelizeModule.forFeature([Movimentacoes])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
})
export class MovimentacaoModule {}
