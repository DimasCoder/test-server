import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import { Roles } from 'src/common/enums/role.enum'

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.STRING)
  first_name: string

  @Column(DataType.STRING)
  last_name: string

  @Unique
  @Column(DataType.STRING)
  email: string

  @Column(DataType.STRING)
  password: string

  @Column({ type: DataType.ENUM({ values: Object.keys(Roles) }) })
  role: Roles

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER,
  allowNull: true})
  user_id: number
}
