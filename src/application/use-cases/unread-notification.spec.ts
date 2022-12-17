import { makeNotification } from '@/test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

describe('UnreadNotification', () => {
  function makeSut() {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationRepository();
    const sut = new UnreadNotification(inMemoryNotificationsRepository);

    return { sut, inMemoryNotificationsRepository };
  }
  test('should unread a notification', async () => {
    const { sut, inMemoryNotificationsRepository } = makeSut();
    const notification = makeNotification({
      readAt: new Date(),
    });
    await inMemoryNotificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  test('should throw NotificationNotFound if the provided notification does not exists', async () => {
    const { sut } = makeSut();
    const notification = makeNotification();

    const promise = sut.execute({
      notificationId: notification.id,
    });

    await expect(promise).rejects.toThrow(new NotificationNotFound());
  });
});
