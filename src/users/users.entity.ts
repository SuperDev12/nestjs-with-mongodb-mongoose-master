import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { Post } from '../posts/post.entity';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @HasOne(() => Post)
  posts: Post[];
  profile: any;
}
