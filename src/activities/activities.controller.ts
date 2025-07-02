import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateActivityDto } from './dto/create-activity.dto';
import { CreateActivityResponseDto } from './dto/create-activity-response.dto';
import { CreateActivityUseCase } from './use-cases/create-activity.use-case';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly createActivityUseCase: CreateActivityUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiBody({ type: CreateActivityDto })
  @ApiCreatedResponse({ type: CreateActivityResponseDto })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  async create(
    @CurrentUser() user: { id: string },
    @Body() body: CreateActivityDto,
  ) {
    const activity = await this.createActivityUseCase.execute({
      ...body,
      userId: user.id,
    });
    return activity;
  }
} 