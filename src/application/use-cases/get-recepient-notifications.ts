import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repostiory';

@Injectable()
export class GetRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  public async execute(
    request: GetRecipientNotifications.Request,
  ): Promise<GetRecipientNotifications.Response> {
    const { recipientId } = request;
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}

export namespace GetRecipientNotifications {
  export type Request = {
    recipientId: Notification['recipientId'];
  };

  export type Response = {
    notifications: Notification[];
  };
}
