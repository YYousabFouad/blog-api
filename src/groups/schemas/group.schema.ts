import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema({
  timestamps: true,
})
export class Group {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    default: '',
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
  })
  permissions!: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
