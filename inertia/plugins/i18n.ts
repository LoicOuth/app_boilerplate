import LocalStorageHelper from '~/utils/local_storage.helper'
import fr from '~/locales/fr.json'
import en from '~/locales/en.json'
import { createI18n, type PluralizationRule } from 'vue-i18n'

const messages = {
  fr,
  en,
}
const availableLocales = Object.keys(messages)
const detectBrowserLanguage = (): string => {
  if (typeof navigator !== 'undefined') {
    const browserLocale = navigator.language.split('-')[0]
    if (availableLocales.includes(browserLocale)) {
      return browserLocale
    }
  }
  return 'fr'
}

const savedLocale =
  typeof window !== 'undefined'
    ? LocalStorageHelper.get<string>(LocalStorageHelper.LocalStorageUserPreferencesKey.Locale)
    : null

const locale = savedLocale || detectBrowserLanguage()

const pluralRules: { [key: string]: PluralizationRule } = {
  en: (choice: number) => {
    return choice === 1 ? 0 : 1
  },
  fr: (choice: number) => {
    return choice >= 2 ? 1 : 0
  },
}

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'fr',
  messages,
  pluralRules,
})
