import { IsNotEmpty, IsString, IsDecimal, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsNotEmpty()
  category_id: string;
}
