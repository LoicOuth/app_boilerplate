import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import AppLayout from '~/layouts/app.layout.vue'
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
        let layout = module.default.layout

        if (name.includes('auth')) {
          layout = AuthLayout
        } else {
          layout = AppLayout
        }

        module.default.layout = layout
      })

      return currentPage
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
