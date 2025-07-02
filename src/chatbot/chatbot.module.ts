import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChatbotController } from './chatbot.controller';
import { SendMessageUseCase } from './use-cases/send-message.use-case';

@Module({
  imports: [AuthModule],
  controllers: [ChatbotController],
  providers: [SendMessageUseCase],
})
export class ChatbotModule {} 