import Notification from '#notifications/models/notification'
import User from '#auth/models/user'
import { DefaultValueInterface } from '#notifications/types/notification_type'
import { NotificationContract } from '#notifications/types/notification_contract'

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
