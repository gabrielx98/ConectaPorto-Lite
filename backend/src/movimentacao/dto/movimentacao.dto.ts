import { Cliente } from "../../cliente/dto/cliente.dto"
import { Conteiner } from "../../conteiner/dto/conteiner.dto"
import { ApiProperty } from '@nestjs/swagger';

export class Movimentacao {
    
    id: number
    codigo: string
    categoria: string
    clienteId: number
    conteinerId: number
    dataInicio: Date
    dataFim: Date

    static fromModel(Model: MovimentacaoModel){
        let dto = new Movimentacao();
        dto.codigo = Model.codigo;
        dto.conteinerId = Model.conteinerId;
        dto.clienteId = Model.clienteId;
        dto.categoria = Model.categoria;
        dto.dataInicio = new Date(Date.parse(Model.dataInicio));
        dto.dataFim = new Date(Date.parse(Model.dataFim));
        return dto;
    }
}

export class MovimentacaoModel {
    @ApiProperty({ example: 1, description: 'Id da movimentação' })
    id: number
    
    @ApiProperty({ example: 'ABC0000001_1734548042806', description: 'Código da movimentação' })
    codigo: string
    
    @ApiProperty({ example: 'GATE IN', description: 'Categoria da movimentação' })
    categoria: string

    @ApiProperty({ example: 1, description: 'Id do cliente' })
    clienteId: number

    @ApiProperty({ example: 1, description: 'Id do conteiner' })
    conteinerId: number

    @ApiProperty({ example: '2021-10-01T00:00:00Z', description: 'Data de início da movimentação' })
    dataInicio: string

    @ApiProperty({ example: '2021-10-01T00:00:00Z', description: 'Data de fim da movimentação' })
    dataFim: string
}
