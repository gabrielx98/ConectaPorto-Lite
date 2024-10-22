import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConteinerService } from './conteiner.service';
import { Conteiner } from './dto/conteiner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Conteiner')
@Controller('Conteiner')
export class ConteinerController {
  constructor(private readonly conteinerService: ConteinerService) { }

  @Post('/cadastrar')
  create(@Body() Conteiner: Conteiner) {
    return this.conteinerService.create(Conteiner)
  }

  @Get('/listar')
  findAll() {
    return this.conteinerService.findAll();
  }

  @Get('/buscar/cliente/:id')
  findByClient(@Param('id') id: string) {
    return this.conteinerService.findByClient(+id);
  }


  @Get('/buscar/:id')
  findOne(@Param('id') id: string) {
    return this.conteinerService.findOne(+id);
  }

  @Patch('/atualizar')
  update(@Body() Conteiner: Conteiner) {
    return this.conteinerService.update(Conteiner);
  }

  @Delete('/remover/:id')
  remove(@Param('id') id: string) {
    return this.conteinerService.remove(+id);
  }
}
