import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

describe('SendNotification', () => {
  function makeSut() {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationRepository();
    const sut = new SendNotification(inMemoryNotificationsRepository);

    return { sut, inMemoryNotificationsRepository };
  }
  test('should send a notification', async () => {
    const { sut, inMemoryNotificationsRepository } = makeSut();
    const { notification } = await sut.execute({
      recipientId: 'example-recipient-id',
      category: 'example-category',
      content: 'example-content',
    });

    expect(notification).toBeInstanceOf(Notification);
    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
