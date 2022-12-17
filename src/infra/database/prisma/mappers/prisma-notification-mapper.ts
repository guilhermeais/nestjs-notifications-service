import { Notification as NotificationPrisma } from '@prisma/client';
import { Notification } from '@/application/entities/notification';
import { Content } from '@/application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.toString(),
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: NotificationPrisma): Notification {
    return new Notification({
      id: raw.id,
      content: new Content(raw.content),
      category: raw.category,
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt,
    });
  }
}
