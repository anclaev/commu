import { IsOptional, IsNumberString } from 'class-validator';

export class PaginationInput {
  @IsNumberString()
  @IsOptional()
  take?: number;

  @IsNumberString()
  @IsOptional()
  skip?: number;

  @IsNumberString()
  @IsOptional()
  cursor?: number;
}
