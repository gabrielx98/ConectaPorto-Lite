import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao, MovimentacaoModel } from './dto/movimentacao.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../security/security.jwt.guard';

@ApiTags('Movimentacao')
@ApiBearerAuth()
@Controller('movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Movimentação criada com sucesso' , type: Movimentacao})
  @Post('/cadastrar')
  create(@Body() Movimentacao: MovimentacaoModel) {
    return this.movimentacaoService.create(Movimentacao);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de movimentações' , type: [Movimentacao]})
  @Get('/listar')
  findAll() {
    return this.movimentacaoService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de movimentações' , type: [Movimentacao]})
  @Get('/listar/atualizado')
  findNow() {
    return this.movimentacaoService.findLastUpdate();
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de movimentações' , type: [Movimentacao]})
  @Get('/listar/atualizado/cliente/:id')
  findNowClient(@Param('id') id: string) {
    return this.movimentacaoService.findLastUpdate(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Movimentação encontrada' , type: Movimentacao})
  @Get('/buscar/:id')
  findOne(@Param('id') id: string) {
    return this.movimentacaoService.findOne(+id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Movimentações encontrada' , type: [Movimentacao]})
  @Get('/buscar/conteiner/:id')
  findByConteiner(@Param('id') id:string) {
    return this.movimentacaoService.findUnitAll(+id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Movimentação atualizada' , type: Movimentacao})
  @Patch('/atualizar')
  update(@Body() Movimentacao: MovimentacaoModel) {
    return this.movimentacaoService.update(Movimentacao);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Movimentação removida' , type: Movimentacao})
  @Delete('/remover/:id')
  remove(@Param('id') id: string) {
    return this.movimentacaoService.remove(+id);
  }
}
