import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Rank, Role } from '@prisma/client';

import { PaginationInput } from '../../common/types/pagination';

export class GetEmployeeListDto extends PaginationInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsNumberString()
  @IsOptional()
  salary?: number;

  @IsString()
  @IsOptional()
  personal_key?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(Rank)
  @IsOptional()
  rank?: Rank;

  @IsString()
  @IsOptional()
  login?: string;
}
