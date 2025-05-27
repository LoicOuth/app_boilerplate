/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '~/assets/css/index.css'
import 'vue-sonner/style.css'
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { registerPlugins } from '~/plugins'
import { getCurrentLayout } from '~/layouts'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    const page = resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )

    page.then((module) => {
      module.default.layout = getCurrentLayout(name)
    })

    return page
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
    registerPlugins(app)
    app.use(plugin)
    app.mount(el)
  },
})
