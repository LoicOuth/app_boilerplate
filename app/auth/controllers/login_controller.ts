import User from '#auth/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({ email: vine.string().email(), password: vine.string() })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('public/auth/login')
  }

  async handle({ response, request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
