import { Module, forwardRef } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Clientes } from './entities/cliente.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConteinerModule } from '../conteiner/conteiner.module';
import { MovimentacaoModule } from 'src/movimentacao/movimentacao.module';

@Module({
  imports: [SequelizeModule.forFeature([Clientes]), forwardRef(() => ConteinerModule), MovimentacaoModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports:[ClienteService]
})
export class ClienteModule {}
