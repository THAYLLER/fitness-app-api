import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { UsersRepository } from './repositories/users.repository';
import { PrismaUsersRepository } from './infra/prisma-users.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'secret'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION', '1h') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    RefreshTokenUseCase,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {} 