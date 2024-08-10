// vite.config.ts
import { defineConfig } from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import vue from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import adonisjs from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/@adonisjs/vite/build/src/client/main.js";
import tailwind from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/autoprefixer/lib/autoprefixer.js";
import AutoImport from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/loic/Documents/workspace/perso/app_boilerplate/node_modules/unplugin-vue-components/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///Users/loic/Documents/workspace/perso/app_boilerplate/vite.config.ts";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.ts" } }),
    vue(),
    adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] }),
    AutoImport({
      imports: [
        "vue",
        {
          "@inertiajs/vue3": ["usePage", "router", "useForm"]
        }
      ],
      dirs: ["inertia/composables/**"],
      dts: "inertia/types/auto-imports.d.ts",
      vueTemplate: true
    }),
    Components({
      dirs: ["inertia/components/shared/ui"],
      dts: "inertia/types/components.d.ts",
      resolvers: [
        (componentName) => {
          if (componentName === "Head" || componentName === "Link") {
            return { name: componentName, from: "@inertiajs/vue3" };
          }
          if (componentName === "DropdownMenuPortal") {
            return { name: componentName, from: "radix-vue" };
          }
        }
      ]
    })
  ],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbG9pYy9Eb2N1bWVudHMvd29ya3NwYWNlL3BlcnNvL2FwcF9ib2lsZXJwbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2xvaWMvRG9jdW1lbnRzL3dvcmtzcGFjZS9wZXJzby9hcHBfYm9pbGVycGxhdGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2xvaWMvRG9jdW1lbnRzL3dvcmtzcGFjZS9wZXJzby9hcHBfYm9pbGVycGxhdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXG5pbXBvcnQgaW5lcnRpYSBmcm9tICdAYWRvbmlzanMvaW5lcnRpYS9jbGllbnQnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBhZG9uaXNqcyBmcm9tICdAYWRvbmlzanMvdml0ZS9jbGllbnQnXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBpbmVydGlhKHsgc3NyOiB7IGVuYWJsZWQ6IHRydWUsIGVudHJ5cG9pbnQ6ICdpbmVydGlhL2FwcC9zc3IudHMnIH0gfSksXG4gICAgdnVlKCksXG4gICAgYWRvbmlzanMoeyBlbnRyeXBvaW50czogWydpbmVydGlhL2FwcC9hcHAudHMnXSwgcmVsb2FkOiBbJ3Jlc291cmNlcy92aWV3cy8qKi8qLmVkZ2UnXSB9KSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgIHtcbiAgICAgICAgICAnQGluZXJ0aWFqcy92dWUzJzogWyd1c2VQYWdlJywgJ3JvdXRlcicsICd1c2VGb3JtJ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZGlyczogWydpbmVydGlhL2NvbXBvc2FibGVzLyoqJ10sXG4gICAgICBkdHM6ICdpbmVydGlhL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZGlyczogWydpbmVydGlhL2NvbXBvbmVudHMvc2hhcmVkL3VpJ10sXG4gICAgICBkdHM6ICdpbmVydGlhL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgKGNvbXBvbmVudE5hbWUpID0+IHtcbiAgICAgICAgICBpZiAoY29tcG9uZW50TmFtZSA9PT0gJ0hlYWQnIHx8IGNvbXBvbmVudE5hbWUgPT09ICdMaW5rJykge1xuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogY29tcG9uZW50TmFtZSwgZnJvbTogJ0BpbmVydGlhanMvdnVlMycgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29tcG9uZW50TmFtZSA9PT0gJ0Ryb3Bkb3duTWVudVBvcnRhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGNvbXBvbmVudE5hbWUsIGZyb206ICdyYWRpeC12dWUnIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYWxpYXNlcyBmb3IgaW1wb3J0aW5nIG1vZHVsZXMgZnJvbVxuICAgKiB5b3VyIGZyb250ZW5kIGNvZGVcbiAgICovXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7Z2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpfS9pbmVydGlhL2AsXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQVIyTCxJQUFNLDJDQUEyQztBQVVuUSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLE1BQU0sWUFBWSxxQkFBcUIsRUFBRSxDQUFDO0FBQUEsSUFDcEUsSUFBSTtBQUFBLElBQ0osU0FBUyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztBQUFBLElBQ3ZGLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFVBQ0UsbUJBQW1CLENBQUMsV0FBVyxVQUFVLFNBQVM7QUFBQSxRQUNwRDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU0sQ0FBQyx3QkFBd0I7QUFBQSxNQUMvQixLQUFLO0FBQUEsTUFDTCxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNLENBQUMsOEJBQThCO0FBQUEsTUFDckMsS0FBSztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1QsQ0FBQyxrQkFBa0I7QUFDakIsY0FBSSxrQkFBa0IsVUFBVSxrQkFBa0IsUUFBUTtBQUN4RCxtQkFBTyxFQUFFLE1BQU0sZUFBZSxNQUFNLGtCQUFrQjtBQUFBLFVBQ3hEO0FBQ0EsY0FBSSxrQkFBa0Isc0JBQXNCO0FBQzFDLG1CQUFPLEVBQUUsTUFBTSxlQUFlLE1BQU0sWUFBWTtBQUFBLFVBQ2xEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxXQUFXLHdDQUFlLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
