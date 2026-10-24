import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100000)
  content!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsMongoId()
  group?: string;
}
