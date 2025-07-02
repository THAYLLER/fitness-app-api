import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { CreateActivityUseCase } from './use-cases/create-activity.use-case';
import { ListActivitiesUseCase } from './use-cases/list-activities.use-case';
import { ActivitiesRepository } from './repositories/activities.repository';
import { PrismaActivitiesRepository } from './infra/prisma-activities.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActivitiesController],
  providers: [
    CreateActivityUseCase,
    ListActivitiesUseCase,
    {
      provide: ActivitiesRepository,
      useClass: PrismaActivitiesRepository,
    },
  ],
})
export class ActivitiesModule {} 