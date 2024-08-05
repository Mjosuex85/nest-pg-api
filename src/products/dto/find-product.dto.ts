import { IsUUID, IsOptional, IsString, MinLength } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsUUID()
  @MinLength(1)
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;
}