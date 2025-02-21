import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin_emails' })
export class AdminEmail extends Model<AdminEmail> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  email: string;

  @Column
  name: string;

  @Column
  role: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
