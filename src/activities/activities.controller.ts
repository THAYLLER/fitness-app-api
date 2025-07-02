import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateActivityDto } from './dto/create-activity.dto';
import { CreateActivityResponseDto } from './dto/create-activity-response.dto';
import { CreateActivityUseCase } from './use-cases/create-activity.use-case';
import { ListActivitiesUseCase } from './use-cases/list-activities.use-case';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly createActivityUseCase: CreateActivityUseCase,
              private readonly listActivitiesUseCase: ListActivitiesUseCase) {}

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

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  @ApiOkResponse({ type: CreateActivityResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  async list(
    @CurrentUser() user: { id: string },
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.listActivitiesUseCase.execute(user.id, Number(limit) || 10, Number(offset) || 0);
  }
} 