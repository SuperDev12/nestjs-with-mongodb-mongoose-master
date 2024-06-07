import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    try {
      if (settings) {
        const newSettings = new this.userSettingsModel(settings);
        const savedNewSettings = await newSettings.save();
        const newUser = new this.userModel({
          ...createUserDto,
          settings: savedNewSettings._id,
        });
        return newUser.save();
      }
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async getsUsers() {
    try {
      return this.userModel.find().populate(['settings', 'posts']);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async getUserById(id: string) {
    try {
      return this.userModel.findById(id).populate(['settings', 'posts']);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async getUserByUsername(username: string) {
    try {
      return this.userModel.findOne({ username }).populate(['settings', 'posts']);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }

  async deleteUser(id: string) {
    try {
      return this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('Random error', 500);
    }
  }
}
