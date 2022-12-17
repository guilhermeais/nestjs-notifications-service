import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repostiory';
import { NotificationNotFound } from './errors/notification-not-found-error';

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  public async execute(
    request: ReadNotification.Request,
  ): Promise<ReadNotification.Response> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}

export namespace ReadNotification {
  export type Request = {
    notificationId: Notification['id'];
  };

  export type Response = void;
}
