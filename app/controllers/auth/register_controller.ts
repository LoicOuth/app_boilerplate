import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }
}
