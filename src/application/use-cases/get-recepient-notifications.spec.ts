import { makeNotification } from '@/test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recepient-notifications';

describe('GetRecipientNotifications', () => {
  function makeSut() {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationRepository();
    const sut = new GetRecipientNotifications(inMemoryNotificationsRepository);

    return { sut, inMemoryNotificationsRepository };
  }
  test('should return all recipient notifications', async () => {
    const recipientIdWithTwoNotifications = 'recipient-id-with-two-count';
    const recipientIdWithOneNotification = 'recipient-id-with-one-count';
    const { sut, inMemoryNotificationsRepository } = makeSut();

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: recipientIdWithTwoNotifications }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: recipientIdWithTwoNotifications }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: recipientIdWithOneNotification }),
    );

    expect(
      (
        await sut.execute({
          recipientId: recipientIdWithTwoNotifications,
        })
      ).notifications,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: recipientIdWithTwoNotifications,
        }),
        expect.objectContaining({
          recipientId: recipientIdWithTwoNotifications,
        }),
      ]),
    );

    expect(
      (
        await sut.execute({
          recipientId: recipientIdWithOneNotification,
        })
      ).notifications,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: recipientIdWithOneNotification,
        }),
      ]),
    );

    expect(
      (
        await sut.execute({
          recipientId: 'recipient-without-notifications',
        })
      ).notifications,
    ).toEqual([]);
  });
});
