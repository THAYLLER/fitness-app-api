import { UsersRepository, CreateUserInput } from '../../repositories/users.repository';
import { User } from '../../entities/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async create(data: CreateUserInput): Promise<User> {
    const user: User = {
      id: Math.random().toString(36).substring(2, 15),
      ...data,
    } as User;
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    const user = await this.findById(id);
    if (user) user.password = password;
  }
} 