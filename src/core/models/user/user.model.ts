import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { isEmail } from 'class-validator';

import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from './user.const';
import { Role } from './user.type';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({
    minlength: USER_USERNAME_MIN_LENGTH,
    maxlength: USER_USERNAME_MAX_LENGTH,
    required: true,
  })
  username: string;

  @Prop({
    validate: {
      validator: (input: string) => isEmail(input),
    },
    required: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: Object.values(Role),
    default: Role.STAFF,
    required: true,
  })
  role: Role;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
