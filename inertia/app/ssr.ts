import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import PublicLayout from '~/layouts/public.layout.vue'
import AuthLayout from '~/layouts/auth.layout.vue'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const currentPage = resolvePageComponent(
        `../pages/${name}.vue`,
        import.meta.glob<DefineComponent>('../pages/**/*.vue')
      )

      currentPage.then((module) => {
        if (module.default.layout === undefined) {
          if (name.includes('login') || name.includes('register')) {
            module.default.layout = AuthLayout
          } else if ((name.includes('public') && !name.includes('auth')) || name.includes('me')) {
            module.default.layout = PublicLayout
          }
        }
      })

      return currentPage
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
