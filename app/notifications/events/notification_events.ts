import emitter from '@adonisjs/core/services/emitter'
import transmit from '@adonisjs/transmit/services/main'

emitter.on('new:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    notification: notification.projection() as any,
  })
})

emitter.on('read:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    readNotification: notification.projection() as any,
  })
})

emitter.on('delete:notification', function (notification) {
  transmit.broadcast(`users/${notification.userId}/notifications`, {
    deleteNotification: notification.id,
  })
})
