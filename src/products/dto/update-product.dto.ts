import { IsOptional, IsString, IsDecimal } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  category_id?: string;
}
