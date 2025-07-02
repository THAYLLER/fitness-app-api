import { ActivitiesRepository, CreateActivityInput } from '../../repositories/activities.repository';
import { Activity } from '../../entities/activity.entity';

export class InMemoryActivitiesRepository implements ActivitiesRepository {
  public activities: Activity[] = [];

  async create(data: CreateActivityInput): Promise<Activity> {
    const activity: Activity = {
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date(),
      ...data,
    } as Activity;
    this.activities.push(activity);
    return activity;
  }

  async findManyByUser(userId: string, limit: number, offset: number): Promise<Activity[]> {
    return this.activities.filter((a) => a.userId === userId).slice(offset, offset + limit);
  }

  async findById(id: string, userId: string): Promise<Activity | null> {
    return this.activities.find((a)=> a.id===id && a.userId===userId) ?? null;
  }
} 