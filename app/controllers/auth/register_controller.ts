import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      firstName: vine.string().maxLength(255),
      lastName: vine.string().maxLength(255),
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

  async handle({ response, request, auth }: HttpContext) {
    const { email, firstName, lastName, password } = await request.validateUsing(
      RegisterController.validator
    )

    const user = await User.create({ email, firstName, lastName, password })

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
