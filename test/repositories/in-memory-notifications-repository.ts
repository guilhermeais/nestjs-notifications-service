import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repostiory';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  public async create(
    notification: NotificationsRepository.Request,
  ): Promise<NotificationsRepository.Response> {
    this.notifications.push(notification);

    return notification;
  }
}
