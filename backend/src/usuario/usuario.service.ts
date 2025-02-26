import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './dto/usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuarios)
    private usuarioRepository: typeof Usuarios,
    private readonly jwtService: JwtService
  ) {}

  async create(Usuario: Usuario) {
    const user = this.usuarioRepository.findOne({
      where: { email: Usuario.email }
    })
    if (user) {
      throw new HttpException('Email em uso', HttpStatus.CONFLICT);
    }
    
    Usuario.senhaHash = bcrypt.hashSync(Usuario.senha, 10);
    return await this.usuarioRepository.create(Usuario);
    
  }

  async findAll() {
    return await this.usuarioRepository.findAll().catch(erro => {
      return erro;
    });
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findByPk(id).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Busca!")
    });
  }

  async autenticar(Usuario: Usuario) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: Usuario.email },
      });
    if (usuario && usuario.senha === Usuario.senha) {
      const payload = { username: usuario.email, sub: usuario.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
  }

  async update(Usuario: Usuario) {
    var usuario = await this.usuarioRepository.findByPk(Usuario.id);

    await usuario.update(Usuario).catch(erro => {
      return erro;
    }).finally( () => {
      console.log("Fim da Atualização!")
    });
    return Usuario;
  }

  async remove(id: number) {
    return await this.usuarioRepository.destroy({
      where: {id},
      }).catch(erro => {
        return erro;
      }).finally( () => {
        console.log("Fim da Remoção!")
      });
  }
}
