import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatbotMessageDto } from './dto/chatbot-message.dto';
import { ChatbotReplyDto } from './dto/chatbot-reply.dto';
import { SendMessageUseCase } from './use-cases/send-message.use-case';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) {}

  @Post('message')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: ChatbotMessageDto })
  @ApiOkResponse({ type: ChatbotReplyDto })
  @ApiBadRequestResponse({ description: 'Mensagem não informada.' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  async send(@Body() body: ChatbotMessageDto): Promise<ChatbotReplyDto> {
    const reply = await this.sendMessageUseCase.execute(body.message);
    return { reply };
  }
} 