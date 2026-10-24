import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password;
      return ret;
    },
  },
  toObject: {
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop()
  age?: number;

  @Prop()
  image?: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.User,
  })
  role!: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
