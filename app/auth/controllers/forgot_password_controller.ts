import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'
import { assertExists } from '@adonisjs/core/helpers/assert'
import string from '@adonisjs/core/helpers/string'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import ForgotPasswordMail from '#auth/mails/forgot_password_mail'

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
    return inertia.render('public/auth/forgot_password')
  }

  async handle({ response, request, session }: HttpContext) {
    const { email } = await request.validateUsing(ForgotPasswordController.sendEmailValidator)

    const user = await User.query().where('email', email).first()
    assertExists(user, 'User not found')

    const connectedAuthProvider = await user.connectedAuthProvider()

    if (connectedAuthProvider) {
      session.flash({ errors: 'Se compte est connecté avec un service externe' })
      return response.redirect().back()
    }

    const resetToken = string.generateRandom(60)

    await user
      .merge({
        resetToken,
        resetTokenExpiry: DateTime.now().plus({ hour: 1 }).toISO(), // 1 hour from now
      })
      .save()

    await mail.send(new ForgotPasswordMail(resetToken, user))

    session.flash({ success: "L'email avec les informations a été envoyé" })
    return response.redirect().back()
  }
}
