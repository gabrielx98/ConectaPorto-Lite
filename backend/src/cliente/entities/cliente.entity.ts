import { Column, Table, Model, DataType } from 'sequelize-typescript';
import { Cliente } from '../dto/cliente.dto';

@Table
export class Clientes extends Model<Cliente> {
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
    nome: string;
}

