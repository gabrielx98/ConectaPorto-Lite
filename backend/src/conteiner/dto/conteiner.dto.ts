import { Cliente } from "../../cliente/dto/cliente.dto"
import { ApiProperty } from '@nestjs/swagger';

export class Conteiner {
    @ApiProperty({ example: 1, description: 'Id do conteiner' })
    id: number

    @ApiProperty({ example: 'ABC0000001', description: 'Código do conteiner' })
    codigo: string

    @ApiProperty({ example: 'Importação', description: 'Tamanho do conteiner' })
    categoria: string

    @ApiProperty({ example: 1, description: 'Id do cliente' })
    clienteId: number

    @ApiProperty({ example: '20 PÉS', description: 'Tamanho do conteiner' })
    tamanho: string
    
    @ApiProperty({ example: 'CHEIO', description: 'Estado do conteiner' })
    estado: string
}
