import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/users.entity';

@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
