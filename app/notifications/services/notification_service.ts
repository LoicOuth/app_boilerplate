import User from '#auth/models/user'
import { NotificationContract } from '#notifications/types/notification_contract'

export default class NotificationService {
  static async send(users: User | User[], notification: NotificationContract) {
    if (Array.isArray(users)) {
      for (const user of users) {
        await this.sendNotification(user, notification)
      }
    } else {
      await this.sendNotification(users, notification)
    }
  }

  private static async sendNotification(user: User, notification: NotificationContract) {
    if (notification.via === 'database' && notification.toDatabase) {
      await notification.toDatabase(user)
    } else if (notification.via === 'email' && notification.toEmail) {
      await notification.toEmail(user)
    }
  }
}
