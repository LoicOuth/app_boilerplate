import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import PublicLayout from '~/layouts/Public.layout.vue'
import AuthLayout from '~/layouts/Auth.layout.vue'
import i18n from '~/plugins/i18n'
import MainLayout from '~/layouts/Main.layout.vue'
import AppLayout from '~/layouts/App.layout.vue'
import { TuyauPlugin } from '@tuyau/inertia/vue'
import { tuyau } from '~/plugins/tuyau'

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
        let layout = AppLayout

        if (name.includes('Login') || name.includes('Register')) {
          layout = AuthLayout
        } else if ((name.includes('public') && !name.includes('auth')) || name.includes('me')) {
          layout = PublicLayout
        } else if (name.includes('auth')) {
          layout = MainLayout
        }

        module.default.layout = layout
      })

      return currentPage
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(i18n)
        .use(TuyauPlugin, { client: tuyau })
        .use(plugin)
    },
  })
}
