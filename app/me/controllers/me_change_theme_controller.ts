import { Theme, ThemSessionKey } from '#types/theme'
import { HttpContext } from '@adonisjs/core/http'

export default class MeChangeThemeController {
  async handle({ session, response }: HttpContext) {
    const currentTheme = session.get(ThemSessionKey, Theme.Dark)

    session.put(ThemSessionKey, currentTheme === Theme.Dark ? Theme.Light : Theme.Dark)

    return response.redirect().back()
  }
}
