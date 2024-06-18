import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { Post } from '../posts/post.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Table
export class User extends Model<User> {
  static findByIdAndUpdate(id: string, updateUserDto: UpdateUserDto, arg2: { new: boolean; }) {
    throw new Error('Method not implemented.');
  }
  @Column
  username: string;
  
  @Column
  password: string;

  @HasOne(() => Post)
  posts: Post[];
  profile: any;
}
