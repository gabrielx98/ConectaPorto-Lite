import { Cliente } from "src/cliente/dto/cliente.dto"
import { Conteiner } from "src/conteiner/dto/conteiner.dto"

export class Movimentacao {
    id: number
    codigo: string
    categoria: string
    cliente: Cliente
    conteiner: Conteiner
    dataInicio: Date
    dataFim: Date
}
