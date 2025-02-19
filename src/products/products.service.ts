import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(options: {
    page?: number;
    limit?: number;
    sort?: string;
    filter?: string;
  }): Promise<{ data: Product[]; total: number }> {
    const { page = 1, limit = 10, sort, filter } = options;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter) {
      const filters = JSON.parse(filter);
      if (filters.name) where.name = Like(`%${filters.name}%`);
      if (filters.minPrice && filters.maxPrice)
        where.price = Between(filters.minPrice, filters.maxPrice);
      if (filters.categoryId) where.category_id = filters.categoryId;
    }

    const order: any = {};
    if (sort === 'price_asc') order.price = 'ASC';
    else if (sort === 'price_desc') order.price = 'DESC';
    else order.created_at = 'DESC';

    const [data, total] = await this.productRepository.findAndCount({
      where,
      order,
      skip,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async uploadImage(file: Express.Multer.File): Promise<{ imageUrl: string }> {
    const imageUrl = `http://localhost:4000/uploads/${file.originalname}`;
    return { imageUrl };
  }
}
