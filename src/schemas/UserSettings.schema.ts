import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserSettings extends Document {
  @Prop({ required: false })
  receiveNotifications?: boolean;

  @Prop({ required: false })
  receiveEmails?: boolean;

  @Prop({ required: false })
  receiveSMS?: boolean;

  @Prop({ required: true })
  theme: string;

  @Prop({ required: true })
  notifications: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
