import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'referralCodeWeb', timestamps: true })
export class ReferralCodeLocate extends Document {
  @Prop({
    type: () => String,
  })
  code: String;
  @Prop({
    type: () => String,
  })
  message: String;

  @Prop({
    type:Boolean,
    default:true,
  })
  active: Boolean;
}
export const ReferralCodeLocateSchema = SchemaFactory.createForClass(ReferralCodeLocate);
