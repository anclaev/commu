import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';

import { Rank } from '@prisma/client';

/**
 * Create employee DTO
 */
export class CreateEmployeeDto {
  /**
   * @ignore
   */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  /**
   * @ignore
   */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  surname?: string;

  /**
   * @ignore
   */
  @IsNumber()
  @IsOptional()
  salary?: number;

  /**
   * @ignore
   */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  personal_key?: string;

  /**
   * @ignore
   */
  @IsEnum(Rank)
  @IsOptional()
  rank?: Rank;

  /**
   * @ignore
   */
  @IsString()
  @IsNotEmpty()
  login: string;

  /**
   * @ignore
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
