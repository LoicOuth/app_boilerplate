import { TuyauPlugin } from '@tuyau/inertia/vue'
import { type App } from 'vue'
import i18n from '~/plugins/i18n'
import { tuyau } from '~/plugins/tuyau'

export const registerPlugins = (app: App) => {
  app.use(i18n)
  app.use(TuyauPlugin, { client: tuyau })
}
