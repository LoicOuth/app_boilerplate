import Notification from '#models/notification'
import User from '#models/user'
import { DefaultValueInterface, NotificationContract } from '#types/notification'

export default class DefaultNotification implements NotificationContract {
  get via(): 'email' | 'database' {
    return 'database'
  }

  constructor(public notificationValue: DefaultValueInterface) {}

  async toDatabase(user: User) {
    await Notification.create({
      value: this.notificationValue,
      type: 'default',
      readAt: null,
      userId: user.id,
    })
  }
}
