import { Column, Table, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Usuario } from '../dto/usuario.dto';

@Table
export class Usuarios extends Model<Usuario> {
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
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    senha: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    senhaHash: string;

}
