import { Notification } from '@/application/entities/notification';
import { NotificationsRepository } from '@/application/repositories/notifications-repostiory';

export class InMemoryNotificationRepository implements NotificationsRepository {
  constructor() {
    this.notifications = [] as Notification[];
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    return notification || null;
  }
  async save(notification: Notification): Promise<Notification> {
    const notificationIndex = this.notifications.findIndex(
      (notification) => notification.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }

    return notification;
  }
  public notifications: Notification[] = [];

  public async create(notification: Notification): Promise<Notification> {
    this.notifications.push(notification);

    return notification;
  }

  public async countManyByRecipientById(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications;
  }
}
