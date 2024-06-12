import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async update(id: string, user: User): Promise<[number, User[]]> {
    const [numberOfAffectedRows, affectedRows] = await this.userModel.update(user, {
      where: { id },
      returning: true,
    });
    return [numberOfAffectedRows, affectedRows as unknown as User[]]; // Adjust the type here if necessary
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
