import transmit from '@adonisjs/transmit/services/main'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { middleware } from '#start/kernel'

transmit.registerRoutes((route) => {
  if (route.getPattern() === '__transmit/events' || route.getPattern() === '__transmit/subscribe') {
    route.middleware(middleware.auth())
  }
})

transmit.authorize('users/:id/notifications', async (context, { id }) => {
  return context.auth.user?.id === +id
})

transmit.on<'subscribe'>('subscribe', async (payload) => {
  if (payload.channel.startsWith('users/') && payload.channel.endsWith('/notifications')) {
    assertExists(payload.context.auth.user, 'User is not authenticated')

    await payload.context.auth.user.load('notifications', (builder) => {
      builder.orderBy('created_at', 'desc')
    })

    transmit.broadcast(payload.channel, {
      notifications: payload.context.auth.user.notifications.map((notification) =>
        notification.projection()
      ) as any,
    })
  }
})
