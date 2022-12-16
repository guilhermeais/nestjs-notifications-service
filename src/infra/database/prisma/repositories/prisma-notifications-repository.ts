import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repostiory';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    notification: NotificationsRepository.Request,
  ): Promise<NotificationsRepository.Response> {
    const createdNotification = await this.prismaService.notifications.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        category: notification.category,
        content: notification.content.toString(),
        createdAt: notification.createdAt,
      },
    });

    return createdNotification as any as Notification;
  }
}
