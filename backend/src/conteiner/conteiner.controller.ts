import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConteinerService } from './conteiner.service';
import { Conteiner } from './dto/conteiner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Conteiner')
@Controller('Conteiner')
export class ConteinerController {
  constructor(private readonly conteinerService: ConteinerService) {}

  @Post('/Cadastrar')
  create(@Body() Conteiner: Conteiner) {
    return this.conteinerService.create(Conteiner);
  }

  @Get('/Listar')
  findAll() {
    return this.conteinerService.findAll();
  }

  @Get('/Buscar/:id')
  findOne(@Param('id') id: string) {
    return this.conteinerService.findOne(+id);
  }

  @Patch('/Atualizar')
  update(@Body() Conteiner: Conteiner) {
    return this.conteinerService.update(Conteiner);
  }

  @Delete('/Remover/:id')
  remove(@Param('id') id: string) {
    return this.conteinerService.remove(+id);
  }
}
