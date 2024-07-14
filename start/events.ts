import Notification from '#notifications/models/notification'
import '#notifications/events/notification_events'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'new:notification': Notification
    'read:notification': Notification
    'delete:notification': Notification
  }
}
