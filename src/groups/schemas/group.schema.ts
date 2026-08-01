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

  @Prop()
  description!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  owner!: Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
