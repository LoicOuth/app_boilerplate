import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    vue(),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
    AutoImport({
      imports: [
        'vue',
        {
          '@inertiajs/vue3': ['usePage', 'router', 'useForm'],
        },
      ],
      dirs: ['inertia/composables/**'],
      dts: 'inertia/types/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dirs: ['inertia/components/shared/ui'],
      dts: 'inertia/types/components.d.ts',
      resolvers: [
        (componentName) => {
          if (componentName === 'Head' || componentName === 'Link') {
            return { name: componentName, from: '@inertiajs/vue3' }
          }
          if (componentName === 'DropdownMenuPortal') {
            return { name: componentName, from: 'radix-vue' }
          }
        },
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
