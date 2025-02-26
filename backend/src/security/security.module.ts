import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SecurityService } from './security.service';
import { JwtAutenticacao } from './security.jwt';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
  ],
  providers: [SecurityService, JwtAutenticacao],
  exports: [SecurityService],
})
export class SecurityModule {}
