import { makeNotification } from '@/test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('CountRecipientNotifications', () => {
  function makeSut() {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationRepository();
    const sut = new CountRecipientNotifications(
      inMemoryNotificationsRepository,
    );

    return { sut, inMemoryNotificationsRepository };
  }
  test('should count all recipient notifications', async () => {
    const recipientIdWithTwoCounts = 'recipient-id-with-two-count';
    const recipientIdWithOneCount = 'recipient-id-with-one-count';
    const { sut, inMemoryNotificationsRepository } = makeSut();

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: recipientIdWithTwoCounts }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: recipientIdWithTwoCounts }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: recipientIdWithOneCount }),
    );

    const recipientIdWithTwoCountsResult = await sut.execute({
      recipientId: recipientIdWithTwoCounts,
    });

    const recipientIdWithOneCountsResult = await sut.execute({
      recipientId: recipientIdWithOneCount,
    });

    const recipeintIdWihtZeroCountResult = await sut.execute({
      recipientId: 'recipient-id-with-zero-count',
    });

    expect(recipientIdWithTwoCountsResult.count).toBe(2);
    expect(recipientIdWithOneCountsResult.count).toBe(1);
    expect(recipeintIdWihtZeroCountResult.count).toBe(0);
  });
});
