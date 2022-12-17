import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repostiory';

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  public async execute(
    request: CountRecipientNotifications.Request,
  ): Promise<CountRecipientNotifications.Response> {
    const { recipientId } = request;
    const count = await this.notificationsRepository.countManyByRecipientById(
      recipientId,
    );

    return { count };
  }
}

export namespace CountRecipientNotifications {
  export type Request = {
    recipientId: Notification['recipientId'];
  };

  export type Response = {
    count: number;
  };
}
