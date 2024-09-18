import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './dto/cliente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('Cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/Cadastrar')
  create(@Body() Cliente: Cliente) {
    return this.clienteService.create(Cliente);
  }

  @Get('/Listar')
  findAll() {
    return this.clienteService.findAll();
  }

  @Get('/Buscar/:id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch('/Atualizar')
  update(@Body() Cliente: Cliente) {
    return this.clienteService.update(Cliente);
  }

  @Delete('/Remover/:id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
