import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import { Role } from '../auth/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface MongoErrorWithCode {
  code?: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email.toLowerCase(),
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const userToCreate: Partial<User> = {
      name: createUserDto.name,
      email: createUserDto.email.toLowerCase(),
      password: hashedPassword,
      age: createUserDto.age,
      image: createUserDto.image,
      role:
        createUserDto.email.toLowerCase() === 'admin@test.com'
          ? Role.Admin
          : Role.User,
    };

    try {
      const createdUser = await this.userModel.create(userToCreate);
      const userObj = createdUser.toObject();
      delete (userObj as { password?: string }).password;
      return userObj;
    } catch (error: unknown) {
      if ((error as MongoErrorWithCode)?.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.userModel.find().select('-password').lean();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password').lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existingUser) {
        throw new ConflictException(
          'Email is already in use by another account',
        );
      }
    }

    const updates: Partial<User> = { ...updateUserDto };

    if (updateUserDto.password) {
      updates.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.email) {
      updates.email = updateUserDto.email.toLowerCase();
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updates, {
        new: true,
      })
      .select('-password')
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: string) {
    await this.postModel.deleteMany({
      author: id,
    });

    const user = await this.userModel
      .findByIdAndDelete(id)
      .select('-password')
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.userModel.exists({ _id: id });
    return !!result;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }
}
