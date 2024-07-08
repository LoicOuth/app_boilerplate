import { ThemCoookieKey, Theme } from '#types/theme'
import { defineConfig } from '@adonisjs/inertia'

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
    user: async ({ auth }) => {
      await auth.check()
      return auth.user
    },
    theme: ({ request }) =>
      request.plainCookie(ThemCoookieKey, {
        encoded: false,
      }) || Theme.Dark,
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

//FIXME: Don't work fix later
// declare module '@adonisjs/inertia/types' {
//   export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {
//     // If necessary, you can also manually add some shared props,
//     // such as those shared from a middleware for example
//     propsSharedFromAMiddleware: number;
//   }
// }
