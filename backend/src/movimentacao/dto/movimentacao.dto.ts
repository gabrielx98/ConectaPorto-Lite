import { Cliente } from "src/cliente/dto/cliente.dto"
import { Conteiner } from "src/conteiner/dto/conteiner.dto"

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
    id: number
    codigo: string
    categoria: string
    clienteId: number
    conteinerId: number
    dataInicio: string
    dataFim: string
}
