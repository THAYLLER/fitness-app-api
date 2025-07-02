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

  async findManyByUser(userId: string, limit: number, offset: number): Promise<Activity[]> {
    const activities = await this.prisma.activity.findMany({
      where: { userId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });
    return activities as Activity[];
  }

  async findById(id: string, userId: string): Promise<Activity | null> {
    const activity = await this.prisma.activity.findFirst({ where: { id, userId } });
    return activity as Activity;
  }

  async update(id: string, userId: string, data: { name: string; duration: number; intensity: string }): Promise<Activity | null> {
    const activity = await this.prisma.activity.findFirst({ where: { id, userId } });
    if (!activity) return null;
    const updated = await this.prisma.activity.update({ where: { id }, data });
    return updated as Activity;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const activity = await this.prisma.activity.findFirst({ where: { id, userId } });
    if (!activity) return false;
    await this.prisma.activity.delete({ where: { id } });
    return true;
  }
} 