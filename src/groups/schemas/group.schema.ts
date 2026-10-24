import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema({
  timestamps: true,
})
export class Group {
  @Prop({
    required: true,
    trim: true,
    index: true,
  })
  name!: string;

  @Prop({
    default: '',
    trim: true,
  })
  description!: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    default: [],
  })
  admins!: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    default: [],
  })
  members!: Types.ObjectId[];

  @Prop({
    default: 'private',
    trim: true,
  })
  permissions!: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
