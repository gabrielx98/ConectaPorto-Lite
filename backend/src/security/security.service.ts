import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) {}

    async validateUser(usuario: Usuario): Promise<any> {
        const user = await this.usuarioService.findOne(usuario.id);
        if (user && bcrypt.compareSync(user.senha === usuario.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    async login(Usuario: Usuario) {
        const usuario = await this.usuarioService.findOne(Usuario.id);
        if (usuario && usuario.senha === Usuario.senha) {
            const payload = { username: usuario.email, sub: usuario.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return null;
    }
        
}
