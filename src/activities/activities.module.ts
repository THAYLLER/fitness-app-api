import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { CreateActivityUseCase } from './use-cases/create-activity.use-case';
import { ListActivitiesUseCase } from './use-cases/list-activities.use-case';
import { GetActivityUseCase } from './use-cases/get-activity.use-case';
import { UpdateActivityUseCase } from './use-cases/update-activity.use-case';
import { DeleteActivityUseCase } from './use-cases/delete-activity.use-case';
import { ActivitiesRepository } from './repositories/activities.repository';
import { PrismaActivitiesRepository } from './infra/prisma-activities.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActivitiesController],
  providers: [
    CreateActivityUseCase,
    ListActivitiesUseCase,
    GetActivityUseCase,
    UpdateActivityUseCase,
    DeleteActivityUseCase,
    {
      provide: ActivitiesRepository,
      useClass: PrismaActivitiesRepository,
    },
  ],
})
export class ActivitiesModule {} 