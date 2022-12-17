import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<Notification>;

  abstract findById(
    notificationId: Notification['id'],
  ): Promise<Notification | null>;

  abstract save(notification: Notification): Promise<Notification>;

  abstract countManyByRecipientById(recipientId: string): Promise<number>;

  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
