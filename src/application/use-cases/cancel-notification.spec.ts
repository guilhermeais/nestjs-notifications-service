import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

describe('CancelNotification', () => {
  function makeSut() {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationRepository();
    const sut = new CancelNotification(inMemoryNotificationsRepository);

    return { sut, inMemoryNotificationsRepository };
  }
  test('should cancel a notification', async () => {
    const { sut, inMemoryNotificationsRepository } = makeSut();
    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'any_recipient_id',
    });
    await inMemoryNotificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('should throw NotificationNotFound if the provided notification does not exists', async () => {
    const { sut, inMemoryNotificationsRepository } = makeSut();
    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'non_existing_recipient_id',
    });

    const promise = sut.execute({
      notificationId: notification.id,
    });

    await expect(promise).rejects.toThrow(new NotificationNotFound());
  });
});
