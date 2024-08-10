import User from '#auth/models/user'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ValidateAccountController {
  async handle({ request, session, response, auth }: HttpContext) {
    if (!request.hasValidSignature()) {
      session.flash({ errors: 'La session a expiré veuillez réssayé' })
      return response.redirect().toRoute('register.index')
    }

    const user = await User.findOrFail(request.param('id'))

    if (!user.validatedAt) {
      user.validatedAt = DateTime.now()
      await user.save()
    }

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
