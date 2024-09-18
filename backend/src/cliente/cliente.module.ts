import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Clientes } from './entities/cliente.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Clientes])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
