import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'accounts',
})
export class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  name: string

  @Column
  surname: string

  @Column
  dateBirth: Date

  @Column
  profession: string
 
  @Column
  email: string

  @Column
  password: string

  @Column
  deletedAt: Date
}
