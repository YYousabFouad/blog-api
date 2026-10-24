import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  ForbiddenException,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { imagekit } from '../common/imagekit/imagekit.provider';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/jwt-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|image\/webp|image\/gif)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Please upload an image');
    }

    try {
      const response = await imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
      });

      return {
        message: 'Image uploaded successfully',
        url: response.url,
        fileId: response.fileId,
      };
    } catch {
      throw new BadRequestException('Failed to upload image');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() currentUser: AuthenticatedUser,
  ) {
    if (
      currentUser.userId !== id &&
      currentUser.role !== Role.Admin &&
      currentUser.role !== Role.SuperAdmin
    ) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: AuthenticatedUser,
  ) {
    if (
      currentUser.userId !== id &&
      currentUser.role !== Role.Admin &&
      currentUser.role !== Role.SuperAdmin
    ) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
