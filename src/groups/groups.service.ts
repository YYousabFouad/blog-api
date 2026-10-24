import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createGroupDto: CreateGroupDto) {
    return this.groupModel.create(createGroupDto);
  }

  async findAll() {
    return this.groupModel
      .find()
      .populate('admins', 'name email image role')
      .populate('members', 'name email image role')
      .lean();
  }

  async findOne(id: string) {
    const group = await this.groupModel
      .findById(id)
      .populate('admins', 'name email image role')
      .populate('members', 'name email image role')
      .lean();

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, {
        new: true,
      })
      .populate('admins', 'name email image role')
      .populate('members', 'name email image role')
      .lean();

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async remove(id: string) {
    const group = await this.groupModel
      .findByIdAndDelete(id)
      .populate('admins', 'name email image role')
      .populate('members', 'name email image role')
      .lean();

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }
}
