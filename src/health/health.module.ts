import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TerminusModule, TypeOrmModule.forFeature([Category])],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
