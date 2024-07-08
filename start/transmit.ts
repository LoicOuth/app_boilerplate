import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'
import { Broadcastable } from '@adonisjs/transmit/types'

transmit.authorizeChannel<{ id: string }>(
  'users/:id/notifications',
  async (ctx: HttpContext, { id }) => {
    return ctx.auth.user?.id === +id
  }
)

transmit.on('subscribe', async (payload) => {
  if (payload.channel.startsWith('users/') && payload.channel.endsWith('/notifications')) {
    if (payload.ctx.auth.user) {
      await payload.ctx.auth.user.load('notifications', (builder) => {
        builder.orderBy('created_at', 'desc')
      })
    }

    transmit.broadcast(payload.channel, {
      notifications: (payload.ctx.auth.user?.notifications || []) as Broadcastable,
    })
  }
})
