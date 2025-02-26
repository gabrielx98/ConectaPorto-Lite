import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './dto/cliente.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../security/security.jwt.guard';

@ApiTags('Cliente')
@ApiBearerAuth()
@Controller('Cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' , type: Cliente})
  @Post('/cadastrar')
  async create(@Body() Cliente: Cliente) {
    return this.clienteService.create(Cliente);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de clientes' , type: [Cliente]})
  @Get('/listar')
  async findAll() {
    return this.clienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Cliente encontrado' , type: Cliente})
  @Get('/buscar/:id')
  async findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Cliente atualizado' , type: Cliente})
  @Patch('/atualizar')
  async update(@Body() Cliente: Cliente) {
    return this.clienteService.update(Cliente);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Cliente removido' , type: Cliente})
  @Delete('/remover/:id')
  async remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }

}
