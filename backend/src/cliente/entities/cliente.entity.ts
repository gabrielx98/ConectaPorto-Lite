import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cliente } from '../dto/cliente.dto';
import { Conteineres } from '../../conteiner/entities/conteiner.entity';

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

    @HasMany(() => Conteineres)
    conteineres: Conteineres[]
}

