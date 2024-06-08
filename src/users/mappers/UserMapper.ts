import { User } from 'src/schemas/User.schema';
import { UserResponseDto } from '../dto/UserResponse.dto';
import { UserSettingsDto } from '../dto/UserSettingsDto';

export class UserMapper {
  static toDto(user: User): UserResponseDto {
    const userSettingsDto: UserSettingsDto = {
      theme: user.settings.theme,
      notifications: user.settings.notifications,
      
    };

    const userResponseDto: UserResponseDto = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      settings: userSettingsDto,
      
    };

    return userResponseDto;
  }
}
