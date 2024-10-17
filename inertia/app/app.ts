/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '~/assets/css/index.css'
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import PublicLayout from '~/layouts/Public.layout.vue'
import AuthLayout from '~/layouts/Auth.layout.vue'
import AppLayout from '~/layouts/App.layout.vue'
import i18n from '~/plugins/i18n'
import MainLayout from '~/layouts/Main.layout.vue'

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

    return page
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(i18n)
      .mount(el)
  },
})
