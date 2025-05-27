import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import { registerPlugins } from '~/plugins'
import { getCurrentLayout } from '~/layouts'

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
        module.default.layout = getCurrentLayout(name)
      })

      return currentPage
    },

    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h(App, props) })
      registerPlugins(app)
      app.use(plugin)
      return app
    },
  })
}
