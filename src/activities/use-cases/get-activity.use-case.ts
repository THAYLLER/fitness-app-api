import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activities.repository';

@Injectable()
export class GetActivityUseCase {
  constructor(private readonly repo: ActivitiesRepository) {}

  async execute(id: string, userId: string) {
    const activity = await this.repo.findById(id, userId);
    if (!activity) throw new NotFoundException('Não encontrada.');
    return activity;
  }
} 