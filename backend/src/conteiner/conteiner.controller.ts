import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConteinerService } from './conteiner.service';
import { Conteiner } from './dto/conteiner.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../security/security.jwt.guard';

@ApiTags('Conteiner')
@ApiBearerAuth()
@Controller('Conteiner')
export class ConteinerController {
  constructor(private readonly conteinerService: ConteinerService) { }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Conteiner criado com sucesso', type: Conteiner })
  @Post('/cadastrar')
  create(@Body() Conteiner: Conteiner) {
    return this.conteinerService.create(Conteiner)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de conteineres', type: [Conteiner] })
  @Get('/listar')
  findAll() {
    return this.conteinerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de conteineres', type: [Conteiner] })
  @Get('/buscar/cliente/:id')
  findByClient(@Param('id') id: string) {
    return this.conteinerService.findByClient(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Conteiner encontrado', type: Conteiner })
  @Get('/buscar/:id')
  findOne(@Param('id') id: string) {
    return this.conteinerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Conteiner atualizado', type: Conteiner })
  @Patch('/atualizar')
  update(@Body() Conteiner: Conteiner) {
    return this.conteinerService.update(Conteiner);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Conteiner removido', type: Conteiner })
  @Delete('/remover/:id')
  remove(@Param('id') id: string) {
    return this.conteinerService.remove(+id);
  }
}
