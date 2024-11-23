import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 0 })
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);

export const CounterModel = model('Counter', CounterSchema);
