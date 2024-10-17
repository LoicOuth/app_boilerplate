import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { inject } from '@adonisjs/core'
import LoopService from '#core/services/loop_service'
import router from '@adonisjs/core/services/router'
import env from '#start/env'

export default class ForgotPasswordController {
  static sendEmailValidator = vine.compile(
    vine.object({
      email: vine
        .string()
        .email()
        .exists(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !!user
        }),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('public/auth/ForgotPassword')
  }

  @inject()
  async handle({ response, request, session }: HttpContext, loop: LoopService) {
    const { email } = await request.validateUsing(ForgotPasswordController.sendEmailValidator)

    const user = await User.query().where('email', email).first()
    assertExists(user, 'User not found')

    const connectedAuthProvider = await user.connectedAuthProvider()

    if (connectedAuthProvider) {
      session.flash({ errors: 'forgotPassword.errorAuthProvider' })
      return response.redirect().back()
    }

    await loop.sendTransactionalEmail({
      email: user.email,
      transactionalId: env.get('LOOP_FORGOT_PASSWORD_TRANSACTIONAL_ID'),
      dataVariables: {
        url: router
          .builder()
          .prefixUrl(env.get('APP_URL'))
          .params({ id: user.id })
          .makeSigned('reset-password.index', { expiresIn: '1 hour' }),
        name: user.name,
      },
    })

    session.flash({ success: 'forgotPassword.sucessMessage' })
    return response.redirect().back()
  }
}
