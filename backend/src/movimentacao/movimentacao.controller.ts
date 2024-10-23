import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movimentacao')
@Controller('movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @Post('/cadastrar')
  create(@Body() Movimentacao: MovimentacaoModel) {
    return this.movimentacaoService.create(Movimentacao);
  }

  @Get('/listar')
  findAll() {
    return this.movimentacaoService.findAll();
  }
  
  @Get('/listar/atualizado')
  findNow() {
    return this.movimentacaoService.findLastUpdate();
  }
  
  @Get('/listar/atualizado/cliente/:id')
  findNowClient(@Param('id') id: string) {
    return this.movimentacaoService.findLastUpdate(+id);
  }

  @Get('/buscar/:id')
  findOne(@Param('id') id: string) {
    return this.movimentacaoService.findOne(+id);
  }
  
  @Get('/buscar/conteiner/:id')
  findByConteiner(@Param('id') id:string) {
    return this.movimentacaoService.findUnitAll(+id);
  }
  
  @Patch('/atualizar')
  update(@Body() Movimentacao: Movimentacao) {
    return this.movimentacaoService.update(Movimentacao);
  }

  @Delete('/remover/:id')
  remove(@Param('id') id: string) {
    return this.movimentacaoService.remove(+id);
  }
}
