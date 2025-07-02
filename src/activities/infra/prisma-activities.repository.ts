import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ActivitiesRepository, CreateActivityInput } from '../repositories/activities.repository';
import { Activity } from '../entities/activity.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class PrismaActivitiesRepository implements ActivitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateActivityInput): Promise<Activity> {
    const activity = await this.prisma.activity.create({
      data: {
        id: randomUUID(),
        name: data.name,
        duration: data.duration,
        intensity: data.intensity,
        userId: data.userId,
      },
    });
    return activity as Activity;
  }
} 