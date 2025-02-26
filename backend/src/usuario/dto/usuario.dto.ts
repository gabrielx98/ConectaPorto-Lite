import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Usuario {
    @ApiProperty({ example: 1, description: 'Id do usuário' })
    id: number;

    @ApiProperty({ example: 'username', description: 'Nome de usuário' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password', description: 'Senha' })
    @IsString()
    @IsNotEmpty()
    senha: string;
    
    senhaHash: string;
}
