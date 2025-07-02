import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activities.repository';

@Injectable()
export class ListActivitiesUseCase {
  constructor(private readonly repo: ActivitiesRepository) {}

  async execute(userId: string, limit = 10, offset = 0) {
    return this.repo.findManyByUser(userId, limit, offset);
  }
} 