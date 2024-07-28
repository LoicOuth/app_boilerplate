import { UserPresenter } from '#me/presenters/user_presenter'
import { ThemCoookieKey, Theme } from '#types/theme'
import { defineConfig } from '@adonisjs/inertia'
import '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: ({ session }) => session?.flashMessages.get('errors'),
    authError: ({ session }) => !!session?.flashMessages.get('errorsBag.E_INVALID_CREDENTIALS'),
    toastError: ({ session }) => session.flashMessages.get('toast_error'),
    toastSuccess: ({ session }) => session.flashMessages.get('toast_success'),
    user: async ({ auth }) => {
      await auth.check()
      return await auth.user?.projection()
    },
    theme: ({ request }) =>
      request.plainCookie(ThemCoookieKey, {
        encoded: false,
      }) ?? Theme.Dark,
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    //FIXME: Remove SSR temporaly because some hydratation issues
    enabled: false,
    pages: (_, page) => page.startsWith('public'),
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends Record<string, any> {
    user?: UserPresenter
    theme: Theme
    authError?: boolean
    toastError?: string
    toastSuccess?: string
  }
}
