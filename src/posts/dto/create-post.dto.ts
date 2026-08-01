import { IsMongoId, IsOptional, IsString } from 'class-validator';
export class CreatePostDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsMongoId()
  author!: string;

  @IsMongoId()
  group!: string;
}
