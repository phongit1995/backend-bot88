import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'zalo-api-auth', timestamps: true })
export class ZaloApiAuth extends Document {
  @Prop({
    type: () => String,
  })
  code: String;
  @Prop({
    type: () => String,
  })
  codeVerify: String;

  @Prop({
    type: () => String,
  })
  codeCapacity: String;

  @Prop({
    type: () => Number,
    required:false
  })
  latitude: Number;

  @Prop({
    type: () => Number,
    required:false,
  })
  longitude: Number;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: Boolean;

}
export const ZaloApiAuthSchema = SchemaFactory.createForClass(ZaloApiAuth);
