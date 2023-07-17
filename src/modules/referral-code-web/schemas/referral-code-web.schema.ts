import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'referralCodeWeb', timestamps: true })
export class ReferralCodeWeb extends Document {
  @Prop({
    type: () => String,
  })
  code: String;
  @Prop({
    type: () => String,
  })
  message: String;
}
export const ReferralCodeWebSchema = SchemaFactory.createForClass(ReferralCodeWeb);
