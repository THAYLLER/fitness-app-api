import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from '../auth/repositories/users.repository';
import { PrismaUsersRepository } from '../auth/infra/prisma-users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {} 