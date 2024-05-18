import { ThemSessionKey, Theme } from '#types/theme'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ToggleThemeController {
  static validator = vine.compile(
    vine.object({
      theme: vine.enum(Theme),
    })
  )

  async handle({ request, session, response }: HttpContext) {
    const { theme } = await request.validateUsing(ToggleThemeController.validator)

    session.put(ThemSessionKey, theme)

    return response.redirect().back()
  }
}
