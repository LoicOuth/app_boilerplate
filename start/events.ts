import Notification from '#models/notification'
import emitter from '@adonisjs/core/services/emitter'
import transmit from '@adonisjs/transmit/services/main'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'new:notification': Notification
  }
}

emitter.on('new:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}`, {
    id: notification.id,
    title: notification.value.title,
    content: notification.value.content,
  })
})
