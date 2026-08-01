import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description!: string;

  @IsMongoId()
  owner!: string;
}
