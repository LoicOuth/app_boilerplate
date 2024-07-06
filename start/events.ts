import Notification from '#models/notification'
import emitter from '@adonisjs/core/services/emitter'
import transmit from '@adonisjs/transmit/services/main'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'new:notification': Notification
  }
}

emitter.on('new:notification', function (notification) {
  console.log(notification.toJSON())
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    notification: notification.toJSON(),
  })
})
