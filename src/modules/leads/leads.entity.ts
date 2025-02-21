import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Sequelize,
} from 'sequelize-typescript';

@Table({ tableName: 'leads', timestamps: false })
export class Lead extends Model<Lead> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      is: /^\+?[1-9]\d{1,14}$/,
    },
  })
  phone: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  message: string;

  @Column({
    type: DataType.ENUM('new', 'contacted', 'converted', 'lost'),
    defaultValue: 'new',
    allowNull: false,
  })
  status: 'new' | 'contacted' | 'converted' | 'lost';

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updatedAt: Date;
}
