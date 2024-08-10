import User from '#auth/models/user'
import LoopService from '#core/services/loop_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import router from '@adonisjs/core/services/router'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      name: vine.string().maxLength(255),
      email: vine
        .string()
        .email()
        .unique(async (db, value) => !(await db.from('users').where('email', value).first())),
      password: vine.string().minLength(8).confirmed(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('public/auth/register')
  }

  @inject()
  async handle({ response, request, session }: HttpContext, loop: LoopService) {
    const { email, name, password } = await request.validateUsing(RegisterController.validator)

    const user = await User.create({ email, name, password })

    const splittedName = user.name.split(' ')
    await loop.createContact({
      email: user.email,
      userId: user.id.toString(),
      firstName: splittedName[0],
      lastName: splittedName[1],
    })

    await loop.sendTransactionalEmail({
      email: user.email,
      transactionalId: env.get('LOOP_FORGOT_PASSWORD_TRANSACTIONAL_ID'),
      dataVariables: {
        name: user.name,
        url: router
          .builder()
          .prefixUrl(env.get('APP_URL'))
          .params({ id: user.id })
          .makeSigned('validate-account.index', { expiresIn: '1 day' }),
      },
    })

    session.flash('success', 'Un e-mail de validation de votre compte a été envoyé.')

    return response.redirect().toRoute('register.index')
  }
}
