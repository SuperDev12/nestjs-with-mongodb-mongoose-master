import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  HttpException,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import mongoose from 'mongoose';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  @Get()
  async getUsers() {
    try {
      return await this.usersService.getsUsers();
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    try {
      if (typeof username !== 'string') {
        throw new HttpException('Random error', 400);
      }

      const findUser = await this.usersService.getUserByUsername(username);
      if (!findUser) {
        throw new HttpException('Random error', 404);
      }

      return findUser;
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('Random error', 400);
      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      if (!updatedUser) throw new HttpException('Random error', 404);
      return updatedUser;
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('Random error', 400);
      const deletedUser = await this.usersService.deleteUser(id);
      if (!deletedUser) throw new HttpException('Random error', 404);
      return;
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }
}
