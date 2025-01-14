import { Column, Table, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Movimentacao } from '../dto/movimentacao.dto';
import { Clientes } from '../../cliente/entities/cliente.entity';
import { Conteineres } from '../../conteiner/entities/conteiner.entity';

@Table
export class Movimentacoes extends Model<Movimentacao>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      id: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    codigo: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categoria: string;

    @ForeignKey(() => Clientes)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    clienteId: string;

    @BelongsTo(() => Clientes)
    cliente: Clientes;

    @ForeignKey(() => Conteineres)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    conteinerId: string;

    @BelongsTo(() => Conteineres)
    conteiner: Conteineres;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dataInicio: Date

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dataFim: Date

}
