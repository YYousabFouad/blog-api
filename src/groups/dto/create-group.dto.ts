import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(2000)
  description!: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(100)
  @IsMongoId({ each: true })
  admins?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(100)
  @IsMongoId({ each: true })
  members?: string[];

  @IsOptional()
  @IsString()
  permissions?: string;
}
