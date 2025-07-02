import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetCurrentUserUseCase } from './use-cases/get-current-user.use-case';
import { UsersRepository } from '../auth/repositories/users.repository';
import { PrismaUsersRepository } from '../auth/infra/prisma-users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    GetCurrentUserUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {} 