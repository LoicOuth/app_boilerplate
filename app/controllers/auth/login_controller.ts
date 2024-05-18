import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }
}
