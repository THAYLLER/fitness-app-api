import { User } from '../entities/user.entity';

export type CreateUserInput = {
  email: string;
  password: string;
};

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: CreateUserInput): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
} 