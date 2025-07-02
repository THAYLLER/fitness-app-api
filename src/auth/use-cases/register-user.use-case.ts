import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

interface RegisterUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: RegisterUserRequest) {
    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return {
      message: 'Usuário registrado com sucesso.',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
} 