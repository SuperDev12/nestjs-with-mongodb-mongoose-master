import { UserSettingsDto } from './UserSettingsDto';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  settings: UserSettingsDto;
}