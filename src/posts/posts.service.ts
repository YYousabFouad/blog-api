import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,

    private readonly usersService: UsersService,
  ) {}

  async create(authorId: string, createPostDto: CreatePostDto) {
    const userExists = await this.usersService.exists(authorId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const postData = {
      ...createPostDto,
      author: authorId,
    };

    return this.postModel.create(postData);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit, search, sort } = paginationDto;

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          title: {
            $regex: escapeRegex(search),
            $options: 'i',
          },
        }
      : {};

    const [data, total] = await Promise.all([
      this.postModel
        .find(filter)
        .populate('author', 'name image')
        .populate('group', 'name description')
        .sort({
          createdAt: sort === 'asc' ? 1 : -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.postModel.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findUserPosts(userId: string) {
    return this.postModel
      .find({ author: userId })
      .populate('author', 'name image')
      .populate('group', 'name description')
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findById(id)
      .populate('author', 'name image')
      .populate('group', 'name description')
      .lean();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, {
        new: true,
      })
      .populate('author', 'name image')
      .populate('group', 'name description')
      .lean();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async remove(id: string) {
    const post = await this.postModel
      .findByIdAndDelete(id)
      .populate('author', 'name image')
      .populate('group', 'name description')
      .lean();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
