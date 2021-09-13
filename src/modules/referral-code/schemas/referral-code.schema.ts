import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EUserType } from 'src/modules/users/user.constant';
@Schema({ collection: 'referralCode', timestamps: true })
export class ReferralCode extends Document {
  @Prop({
    type: () => String,
  })
  referralCode: string;

  @Prop({
    type: () => Number,
    enum: EUserType,
    default: EUserType.WEFINEX,
  })
  typeAccount: Number;
}
export const ReferralCodeSchema = SchemaFactory.createForClass(ReferralCode);
