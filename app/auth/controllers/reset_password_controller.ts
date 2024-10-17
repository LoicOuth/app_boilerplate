import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'

export default class ResetPasswordController {
  static sendEmailValidator = vine.compile(
    vine.object({
      id: vine.number(),
      password: vine.string().confirmed(),
    })
  )

  render({ inertia, request, session }: HttpContext) {
    if (!request.hasValidSignature()) {
      session.flash({ errors: 'resetPassword.sessionExpiredError' })
    }

    return inertia.render('public/auth/ResetPassword', {
      id: request.param('id'),
    })
  }

  async handle({ request, response, auth }: HttpContext) {
    const { password, id } = await request.validateUsing(ResetPasswordController.sendEmailValidator)

    const user = await User.findOrFail(id)

    await user.merge({ password }).save()

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
