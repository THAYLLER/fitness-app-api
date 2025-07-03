import { Injectable } from '@nestjs/common';
import { DeepSeekService } from '../deepseek.service';

@Injectable()
export class SendMessageUseCase {
  constructor(private readonly deepSeek: DeepSeekService) {}

  async execute(message: string): Promise<string> {
    return this.deepSeek.chat(message);
  }
} 