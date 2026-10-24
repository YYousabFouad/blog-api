import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsMongoId()
  author?: string;

  @IsOptional()
  @IsMongoId()
  group?: string;
}
