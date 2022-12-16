import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('should create a notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'friendship',
      recipientId: '123',
      readAt: null,
    });

    expect(notification).toBeInstanceOf(Notification);
  });
});
