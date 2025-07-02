import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiUnprocessableEntityResponse, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { RegisterAuthResponseDto } from './dto/register-auth-response.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { LoginAuthResponseDto } from './dto/login-auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiBody({ type: RegisterAuthDto })
  @ApiCreatedResponse({ description: 'Usuário registrado com sucesso.', type: RegisterAuthResponseDto })
  @ApiBadRequestResponse({ description: 'Email já cadastrado.' })
  @ApiUnprocessableEntityResponse({ description: 'Dados inválidos.' })
  async register(@Body() body: RegisterAuthDto) {
    return this.registerUserUseCase.execute(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiBody({ type: LoginAuthDto })
  @ApiOkResponse({ description: 'Login realizado com sucesso.', type: LoginAuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas.' })
  @ApiUnprocessableEntityResponse({ description: 'Dados inválidos.' })
  async login(@Body() body: LoginAuthDto) {
    return this.authenticateUserUseCase.execute(body);
  }
} 