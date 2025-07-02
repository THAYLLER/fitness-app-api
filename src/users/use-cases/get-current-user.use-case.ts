import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../auth/repositories/users.repository';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById?.(userId);
    // Caso método não exista, usar findByEmail
    if (!user) {
      throw new UnauthorizedException('Não autenticado.');
    }
    return { id: user.id, email: user.email };
  }
} 