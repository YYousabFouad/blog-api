import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/jwt-payload.interface';
import { Role } from '../auth/enums/role.enum';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

function extractAuthorId(author: unknown): string {
  if (!author) {
    return '';
  }
  if (typeof author === 'string') {
    return author;
  }
  if (typeof author === 'object' && author !== null) {
    if ('_id' in author) {
      const id = (author as { _id?: { toString(): string } | string })._id;
      if (typeof id === 'string') {
        return id;
      }
      if (id && typeof id.toString === 'function') {
        return id.toString();
      }
    }
    const hasToString = author as { toString?: () => string };
    if (
      typeof hasToString.toString === 'function' &&
      hasToString.toString !== Object.prototype.toString
    ) {
      return hasToString.toString();
    }
  }
  return '';
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.postsService.create(user.userId, createPostDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get('user/:userId')
  findUserPosts(@Param('userId', ParseObjectIdPipe) userId: string) {
    return this.postsService.findUserPosts(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const existing = await this.postsService.findOne(id);
    const authorId = extractAuthorId(existing.author);

    if (
      authorId !== user.userId &&
      user.role !== Role.Admin &&
      user.role !== Role.SuperAdmin
    ) {
      throw new ForbiddenException('You can only update your own posts');
    }

    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const existing = await this.postsService.findOne(id);
    const authorId = extractAuthorId(existing.author);

    if (
      authorId !== user.userId &&
      user.role !== Role.Admin &&
      user.role !== Role.SuperAdmin
    ) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    return this.postsService.remove(id);
  }
}
