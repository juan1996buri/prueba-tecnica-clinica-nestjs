import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  Matches,
} from 'class-validator';

export class FilterDTO {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  filterNameColum: string;

  @IsOptional()
  @IsString()
  filterTextColum: string;
}
