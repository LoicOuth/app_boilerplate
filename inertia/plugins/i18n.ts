import { createI18n } from 'vue-i18n'
import frFR from '~/locales/fr-FR.json'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'fr-FR',
  messages: {
    'fr-FR': frFR,
  },
})

export default i18n
