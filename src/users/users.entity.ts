import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Post } from '../posts/post.entity';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => Post)
  posts: Post[];
}
