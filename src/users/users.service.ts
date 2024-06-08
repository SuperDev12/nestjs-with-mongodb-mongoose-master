import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { UserResponseDto } from './dto/UserResponse.dto';
import { UserMapper } from './mappers/UserMapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto): Promise<UserResponseDto> {
    try {
      if (settings) {
        const newSettings = new this.userSettingsModel(settings);
        const savedNewSettings = await newSettings.save();
        const newUser = new this.userModel({
          ...createUserDto,
          settings: savedNewSettings._id,
        });
        const savedUser = await newUser.save();
        return UserMapper.toDto(savedUser);
      }
      const newUser = new this.userModel(createUserDto);
      const savedUser = await newUser.save();
      return UserMapper.toDto(savedUser);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async getsUsers(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userModel.find().populate(['settings', 'posts']);
      return users.map(UserMapper.toDto);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.findById(id).populate(['settings', 'posts']);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return UserMapper.toDto(user);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async getUserByUsername(username: string): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.findOne({ username }).populate(['settings', 'posts']);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return UserMapper.toDto(user);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      if (!updatedUser) {
        throw new HttpException('User not found', 404);
      }
      return UserMapper.toDto(updatedUser);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new HttpException('User not found', 404);
      }
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }
}
