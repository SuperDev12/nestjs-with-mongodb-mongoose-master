import { Injectable, Inject, Body, BadRequestException, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { NextFunction } from 'express';

@Injectable()
export class ValidateHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['custom-header']) {
      throw new BadRequestException('Missing custom header');
    }
    next();
  }
}

export class UsersService {
  [x: string]: any;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
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
