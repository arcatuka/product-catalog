import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Repository } from 'typeorm';
import { Category } from '../categories/category.entity';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @HealthCheck()
  async checkHealth() {
    const categoryCount = await this.categoryRepository.count();
    return this.health.check([
      () => this.db.pingCheck('database'),
      async () => ({
        tableCheck: {
          status: categoryCount > 0 ? 'up' : 'down',
          message:
            categoryCount > 0
              ? 'Categories table has data'
              : 'Categories table is empty',
        },
      }),
    ]);
  }
}
