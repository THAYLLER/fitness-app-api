import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activities.repository';

@Injectable()
export class DeleteActivityUseCase {
  constructor(private readonly repo: ActivitiesRepository) {}

  async execute(id: string, userId: string) {
    const deleted = await this.repo.delete(id, userId);
    if (!deleted) throw new NotFoundException('Não encontrada.');
  }
} 