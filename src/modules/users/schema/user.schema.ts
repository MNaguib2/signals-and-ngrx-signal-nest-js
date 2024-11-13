import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// Define the User schema and its properties.
@Schema()
export class User extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  user_name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  //https://chatgpt.com/c/67345799-25b4-8004-9c25-cb751daf1360
  if (!this.isNew) return next();

  try {
    const counter = await this.db
      .model('Counter')
      .findOneAndUpdate(
        { name: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );

    this.id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});
