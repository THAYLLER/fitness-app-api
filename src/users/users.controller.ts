import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GetCurrentUserUseCase } from './use-cases/get-current-user.use-case';
import { UserMeResponseDto } from './dto/user-me-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly getCurrentUserUseCase: GetCurrentUserUseCase) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserMeResponseDto })
  @ApiUnauthorizedResponse({ description: 'Não autenticado.' })
  async me(@CurrentUser() user: { id: string }) {
    return this.getCurrentUserUseCase.execute(user.id);
  }
} 