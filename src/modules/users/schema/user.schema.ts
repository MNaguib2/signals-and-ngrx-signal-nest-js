import { HttpException, HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IncrementCounter } from '@src/modules/global/functions/Increment-counter';
import { HydratedDocument } from 'mongoose';

export type UserHydrated = HydratedDocument<User>;

// Define the User schema and its properties.
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  user_name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: String,
    required: false,
    default: null,
    unique: true,
    validate: {
      validator: (value: string | null) => {
        // Allow null values or validate email format
        return (
          value === null ||
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
            value,
          )
        );
      },
      message: 'Invalid email format',
    },
  })
  email: string;

  @Prop({
    type: String,
    default: null,
    required: false,
    unique: true,
  })
  phone: string;

  @Prop({ type: Number, unique: true, required: false })
  id: number; // Custom, auto-incrementing ID

  @Prop({
    type: String,
    default: null,
    required: false,
  })
  image_profile_url?: string;

  @Prop({
    type: String,
    default: null,
    required: false,
  })
  JWT_TOKEN?: string;

  @Prop({
    type: String,
    default: null,
    required: false,
  })
  TOKEN?: string;

  @Prop({
    type: Boolean,
    default: true,
    required: true,
  })
  is_active?: boolean;

  @Prop({
    type: Date,
    default: Date.now, // Set the default value to the current date
    expires: 3600, // Expire after 3600 seconds (1 hour)
    required: false,
  })
  EXPIRE_TOKEN?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(IncrementCounter, { field: 'id', counterName: 'userId' });

UserSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.code === 11000) {
    const keyValue = Object.keys(error.keyValue).flat();
    throw new HttpException(
      'Duplicate Key ' +
        keyValue +
        `: - ${error.keyValue[keyValue[0]]} already exists`,
      HttpStatus.FORBIDDEN,
    );
  } else {
    next();
  }
});
