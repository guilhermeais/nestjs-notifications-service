import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repostiory';
import { NotificationNotFound } from './errors/notification-not-found-error';

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  public async execute(
    request: UnreadNotification.Request,
  ): Promise<UnreadNotification.Response> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}

export namespace UnreadNotification {
  export type Request = {
    notificationId: Notification['id'];
  };

  export type Response = void;
}
