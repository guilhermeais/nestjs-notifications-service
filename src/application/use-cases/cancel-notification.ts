import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repostiory';
import { NotificationNotFound } from './errors/notification-not-found-error';

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  public async execute(
    request: CancelNotification.Request,
  ): Promise<CancelNotification.Response> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}

export namespace CancelNotification {
  export type Request = {
    notificationId: Notification['id'];
  };

  export type Response = void;
}
