import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './dto/usuario.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../security/security.jwt.guard';

@ApiTags('Usuario')
@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/cadastrar')
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' , type: Usuario})
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Lista de usuários' , type: [Usuario]})
  @Get('/listar')
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Usuário encontrado' , type: Usuario})
  @Get('/buscar/:id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Usuário atualizado' , type: Usuario})
  @Patch('/atualizar')
  update(@Body() usuario: Usuario) {
    return this.usuarioService.update(usuario);
  }

  @Post('/autenticar')
  @ApiResponse({ status: 200, description: 'Usuário autenticado' , type: Usuario})
  async autenticar(@Body() usuario: Usuario) {
    return await this.usuarioService.autenticar(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Usuário removido' , type: Usuario})
  @Delete('/remover/:id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
