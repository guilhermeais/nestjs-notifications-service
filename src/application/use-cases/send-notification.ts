import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repostiory';

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  public async execute(
    request: SendNotification.Request,
  ): Promise<SendNotification.Response> {
    const { recipientId, content, category } = request;
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);
    return { notification };
  }
}

export namespace SendNotification {
  export type Request = {
    recipientId: string;
    content: string;
    category: string;
  };

  export type Response = { notification: Notification };
}
