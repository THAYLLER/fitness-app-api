import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ChatbotController } from './chatbot.controller';
import { SendMessageUseCase } from './use-cases/send-message.use-case';
import { DeepSeekService } from './deepseek.service';

@Module({
  imports: [
    AuthModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('DEEPSEEK_API_URL'),
        headers: {
          Authorization: `Bearer ${config.get<string>('DEEPSEEK_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }),
    }),
  ],
  controllers: [ChatbotController],
  providers: [SendMessageUseCase, DeepSeekService],
})
export class ChatbotModule {} 