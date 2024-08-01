import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'

export default class ResetPasswordController {
  static sendEmailValidator = vine.compile(
    vine.object({
      token: vine.string(),
      password: vine.string().confirmed(),
    })
  )

  private async checkToken(token: string) {
    const user = await User.findBy('resetToken', token)

    if (!user || (user.resetTokenExpiry && user.resetTokenExpiry.diffNow().milliseconds < 0)) {
      return null
    }

    return user
  }

  async render({ inertia, request, session, response }: HttpContext) {
    const user = await this.checkToken(request.qs().token)

    if (!user) {
      session.flash({ errors: 'La session a expiré veuillez réssayé' })
      return response.redirect().toRoute('forgot-password.index')
    }

    return inertia.render('public/auth/reset_password')
  }

  async handle({ request, session, response, auth }: HttpContext) {
    const { password, token } = await request.validateUsing(
      ResetPasswordController.sendEmailValidator
    )

    const user = await this.checkToken(token)

    if (!user) {
      session.flash({ errors: 'La session a expiré veuillez réssayé' })
      return response.redirect().back()
    }

    await user
      .merge({
        password,
      })
      .save()

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
