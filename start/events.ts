import Notification from '#models/notification'
import emitter from '@adonisjs/core/services/emitter'
import transmit from '@adonisjs/transmit/services/main'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'new:notification': Notification
    'read:notification': Notification
    'delete:notification': Notification
  }
}

emitter.on('new:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    notification: notification.toJSON(),
  })
})

emitter.on('read:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    readNotification: notification.toJSON(),
  })
})

emitter.on('delete:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    deleteNotification: notification.id,
  })
})
