import { Content } from './content';

describe('Notification content', () => {
  test('should create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeInstanceOf(Content);
    expect(content.toString()).toBe('Você recebeu uma solicitação de amizade');
  });

  test('should throw an error if content length is less than 5 characters', () => {
    expect(() => new Content('')).toThrowError(
      'Content length must be between 5 and 240 characters',
    );
  });

  test('should throw an error if content length is greater than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrowError(
      'Content length must be between 5 and 240 characters',
    );
  });
});
