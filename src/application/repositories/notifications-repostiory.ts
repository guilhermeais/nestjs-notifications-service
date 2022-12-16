import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  public abstract create(
    notification: NotificationsRepository.Request,
  ): Promise<NotificationsRepository.Response>;
}

export namespace NotificationsRepository {
  export type Request = Notification;

  export type Response = Notification;
}
