import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'config-data', timestamps: true })
export class ConfigData extends Document {
  @Prop({
    type: () => String,
  })
  zaloPhone: string;

}
export const ConfigDataSchema = SchemaFactory.createForClass(ConfigData);
