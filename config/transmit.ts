import { defineConfig } from '@adonisjs/transmit'

export default defineConfig({
  pingInterval: false,
  transport: null,
  async routeHandlerModifier(route) {
    const { middleware } = await import('#start/kernel')

    if (
      route.getPattern() === '__transmit/events' ||
      route.getPattern() === '__transmit/subscribe'
    ) {
      route.middleware(middleware.auth())
      return
    }
  },
})
