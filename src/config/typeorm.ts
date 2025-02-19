import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Tuka 1803',
  database: 'product_management_db',
  entities: [Product, Category],
  migrations: ['src/migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
