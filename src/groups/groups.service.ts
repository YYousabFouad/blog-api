import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Group, GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<GroupDocument>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupModel.create(createGroupDto);
  }

  findAll() {
    return this.groupModel.find().populate('owner');
  }

  findOne(id: string) {
    return this.groupModel.findById(id).populate('owner');
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.groupModel.findByIdAndDelete(id);
  }
}
