import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'zaloApiWeb', timestamps: true })
export class ZaloApiWeb extends Document {
  @Prop({
    type: () => String,
  })
  code: String;
  @Prop({
    type: () => String,
  })
  avatar: String;
  @Prop({
    type: () => String,
  })
  fullName: String;
  @Prop({
    type: () => String,
  })
  message: String;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: Boolean;

}
export const ZaloApiWebSchema = SchemaFactory.createForClass(ZaloApiWeb);
