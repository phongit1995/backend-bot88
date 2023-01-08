import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EUserRole, EUserType } from '../user.constant';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ type: () => String })
  phone: string;

  @Prop({ type: () => String })
  password: string;

  @Prop({ type: () => String, enum: EUserType, default: EUserType.WEFINEX })
  type: number;

  @Prop({ type: () => Number, enum: EUserRole, default: EUserRole.USER })
  role: number;

  @Prop({ type: [String] })
  token: string[];

  @Prop({ type: Boolean })
  isAdmin: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
