import { Activity } from '../entities/activity.entity';

export type CreateActivityInput = {
  name: string;
  duration: number;
  intensity: string;
  userId: string;
};

export abstract class ActivitiesRepository {
  abstract create(data: CreateActivityInput): Promise<Activity>;
  abstract findManyByUser(userId: string, limit: number, offset: number): Promise<Activity[]>;
} 