import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma.health';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private db: PrismaHealthIndicator) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([() => this.db.isHealthy('database')]);
  }
} 