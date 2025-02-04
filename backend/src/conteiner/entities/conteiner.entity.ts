import { Column, Table, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Conteiner } from '../dto/conteiner.dto';
import { Clientes } from '../../cliente/entities/cliente.entity';

@Table
export class Conteineres extends Model<Conteiner>{
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    tamanho: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    estado: string;

    @ForeignKey(() => Clientes)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    clienteId: number;

    @BelongsTo(() => Clientes)
    cliente: Clientes;
}
