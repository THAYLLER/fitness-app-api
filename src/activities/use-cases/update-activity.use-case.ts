import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activities.repository';

interface UpdateActivityRequest {
  id: string;
  userId: string;
  name: string;
  duration: number;
  intensity: string;
}

@Injectable()
export class UpdateActivityUseCase {
  constructor(private readonly repo: ActivitiesRepository) {}

  async execute({ id, userId, name, duration, intensity }: UpdateActivityRequest) {
    const activity = await this.repo.update(id, userId, { name, duration, intensity });
    if (!activity) throw new NotFoundException('Não encontrada.');
    return activity;
  }
} 