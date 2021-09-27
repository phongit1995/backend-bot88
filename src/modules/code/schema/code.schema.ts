import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'code', timestamps: true })
export class Code extends Document {
  @Prop({ type: () => String })
  code: string;

  @Prop({ type: () => Boolean })
  type: boolean;

  @Prop({ type: ()=>String })
  message: string;
}
export const CodeSchema = SchemaFactory.createForClass(Code);
