import { DefaultValueInterface, NotificationType } from '#notifications/types/notification_type'
import Notification from '#notifications/models/notification'

export class NotificationPresenter {
  declare id: number
  declare type: NotificationType
  declare value: DefaultValueInterface
  declare readAt: string | null
  declare createdAt: string

  constructor(notification: Notification) {
    this.id = notification.id
    this.type = notification.type
    this.value = notification.value
    this.readAt = notification.readAt?.toString() || null
    this.createdAt = notification.createdAt.toString()
  }
}
