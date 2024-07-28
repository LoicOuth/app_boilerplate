import User from '#auth/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

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

  async handle({ response, request, auth }: HttpContext) {
    const { email, name, password } = await request.validateUsing(RegisterController.validator)

    const user = await User.create({ email, name, password })

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
