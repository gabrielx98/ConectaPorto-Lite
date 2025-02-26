import { ApiProperty } from '@nestjs/swagger';

export class Cliente {
    @ApiProperty({ example: 1, description: 'Id do cliente' })
    id: number
    
    @ApiProperty({ example: 'ABC', description: 'Código do cliente' })
    codigo: string
    
    @ApiProperty({ example: 'Empresa ABC', description: 'Nome do cliente' })
    nome: string
}
