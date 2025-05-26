import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  InertiaVueComponentResolver,
  InertiaVueImports,
} from '@louth/inertia-vue3-unplugin-resolver'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    vue(),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-i18n', { '@tuyau/inertia/vue': ['useRouter'] }, InertiaVueImports],
      dirs: ['inertia/composables/**'],
      dts: 'inertia/types/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dirs: ['inertia/components/shared/ui/**'],
      dts: 'inertia/types/components.d.ts',
      resolvers: [
        (name: string) => {
          if (name === 'Link') {
            return { from: '@tuyau/inertia/vue', name }
          }
        },
        InertiaVueComponentResolver(),
      ],
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
