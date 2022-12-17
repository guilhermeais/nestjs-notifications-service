import { Content } from '@/application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@/application/entities/notification';
import { faker } from '@faker-js/faker';
type Override = Partial<NotificationProps>;

export function makeNotification(override?: Override) {
  return new Notification({
    category: faker.word.noun(),
    content: new Content(faker.lorem.word({ length: { min: 5, max: 240 } })),
    recipientId: faker.datatype.uuid(),
    ...override,
  });
}
