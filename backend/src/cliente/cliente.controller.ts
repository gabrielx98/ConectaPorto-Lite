import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './dto/cliente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('Cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/cadastrar')
  async create(@Body() Cliente: Cliente) {
    return this.clienteService.create(Cliente);
  }

  @Get('/listar')
  async findAll() {
    return this.clienteService.findAll();
  }

  @Get('/buscar/:id')
  async findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch('/atualizar')
  async update(@Body() Cliente: Cliente) {
    return this.clienteService.update(Cliente);
  }

  @Delete('/remover/:id')
  async remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }

}
