import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiQuery, ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateActivityDto } from './dto/create-activity.dto';
import { CreateActivityResponseDto } from './dto/create-activity-response.dto';
import { CreateActivityUseCase } from './use-cases/create-activity.use-case';
import { ListActivitiesUseCase } from './use-cases/list-activities.use-case';
import { GetActivityUseCase } from './use-cases/get-activity.use-case';
import { UpdateActivityUseCase } from './use-cases/update-activity.use-case';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { UpdateActivityResponseDto } from './dto/update-activity-response.dto';
import { DeleteActivityUseCase } from './use-cases/delete-activity.use-case';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly createActivityUseCase: CreateActivityUseCase,
              private readonly listActivitiesUseCase: ListActivitiesUseCase,
              private readonly getActivityUseCase: GetActivityUseCase,
              private readonly updateActivityUseCase: UpdateActivityUseCase,
              private readonly deleteActivityUseCase: DeleteActivityUseCase) {}

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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateActivityResponseDto })
  @ApiNotFoundResponse({ description: 'Não encontrada.' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  async findOne(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    return this.getActivityUseCase.execute(id, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateActivityResponseDto })
  @ApiNotFoundResponse({ description: 'Não encontrada.' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  @ApiBody({ type: UpdateActivityDto })
  async update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() body: UpdateActivityDto,
  ) {
    return this.updateActivityUseCase.execute({ id, userId: user.id, ...body });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Excluída com sucesso.' })
  @ApiNotFoundResponse({ description: 'Não encontrada.' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  async remove(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    await this.deleteActivityUseCase.execute(id, user.id);
  }
} 