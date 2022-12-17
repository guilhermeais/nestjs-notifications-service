import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repostiory';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const rawNotifications = await this.prisma.notification.findMany({
      where: {
        recipientId: recipientId,
      },
    });

    return rawNotifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const rawNotification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!rawNotification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(rawNotification);
  }

  async save(notification: Notification): Promise<Notification> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);

    const rawUpdatedNotification = await this.prisma.notification.update({
      where: {
        id: rawNotification.id,
      },
      data: rawNotification,
    });

    return PrismaNotificationMapper.toDomain(rawUpdatedNotification);
  }

  public async create(notification: Notification): Promise<Notification> {
    const mappedNotificaiton = PrismaNotificationMapper.toPrisma(notification);

    const createdNotification = await this.prisma.notification.create({
      data: mappedNotificaiton,
    });

    return createdNotification as any as Notification;
  }

  async countManyByRecipientById(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId: recipientId,
      },
    });

    return count;
  }
}
