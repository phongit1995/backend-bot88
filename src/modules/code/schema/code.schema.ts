import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'code', timestamps: true })
export class Code extends Document {
  @Prop({ type: () => String })
  code: string;

  @Prop({ type: () => Boolean })
  type: boolean;

  @Prop({
    type: () => String,
    default:
      'Cấu hình điện thoại của bạn k phù hợp mã phần mềm này. Vui lòng nhập mã phần mềm khác',
  })
  message: string;

  @Prop({
    type: () => Boolean,
    default: false,
  })
  actived: boolean;
}
export const CodeSchema = SchemaFactory.createForClass(Code);
