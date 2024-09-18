import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao } from './dto/movimentacao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movimentacao')
@Controller('Movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @Post('/Cadastrar')
  create(@Body() Movimentacao: Movimentacao) {
    return this.movimentacaoService.create(Movimentacao);
  }

  @Get('/Listar')
  findAll() {
    return this.movimentacaoService.findAll();
  }

  @Get('/Buscar/:id')
  findOne(@Param('id') id: string) {
    return this.movimentacaoService.findOne(+id);
  }

  @Patch('/Atualizar')
  update(@Body() Movimentacao: Movimentacao) {
    return this.movimentacaoService.update(Movimentacao);
  }

  @Delete('/Remover/:id')
  remove(@Param('id') id: string) {
    return this.movimentacaoService.remove(+id);
  }
}
