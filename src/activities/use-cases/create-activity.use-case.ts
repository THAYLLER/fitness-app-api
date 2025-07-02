import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activities.repository';

interface CreateActivityRequest {
  name: string;
  duration: number;
  intensity: string;
  userId: string;
}

@Injectable()
export class CreateActivityUseCase {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}

  async execute(data: CreateActivityRequest) {
    const activity = await this.activitiesRepository.create(data);
    return activity;
  }
} 