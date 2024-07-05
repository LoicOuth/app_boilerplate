import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'

// transmit.authorizeChannel<{ id: string }>('users/:id', (ctx: HttpContext, { id }) => {
//   return ctx.auth.user?.id === +id
// })
