import { defineConfig } from '@adonisjs/inertia'
import { ThemSessionKey, Theme } from '#types/theme'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    theme: (ctx) => ctx.session?.get(ThemSessionKey) || Theme.Dark,
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    pages: ['home', 'auth/login', 'auth/register'],
  },
})
