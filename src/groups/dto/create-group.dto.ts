import { IsArray, IsOptional, IsString, ArrayUnique } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  admins?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  members?: string[];

  @IsOptional()
  @IsString()
  permissions?: string;
}
