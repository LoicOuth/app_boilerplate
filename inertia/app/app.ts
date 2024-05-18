/// <reference path="../../adonisrc.ts" />

import '~/assets/css/index.css'
import { createSSRApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import AppLayout from '~/layouts/app.layout.vue'
import AuthLayout from '~/layouts/auth.layout.vue'

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
      let layout = module.default.layout

      if (name.includes('auth')) {
        layout = AuthLayout
      } else {
        layout = AppLayout
      }

      module.default.layout = layout
    })

    return page
  },

  setup({ el, App, props, plugin }) {
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
