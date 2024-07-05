import { HttpContext } from '@adonisjs/core/http'
import DefaultNotification from '../notifications/default_notification.js'

export default class HomeController {
  async render({ inertia }: HttpContext) {
    return inertia.render('public/home')
  }

  async sendNotif({ auth, response }: HttpContext) {
    if (await auth.check()) {
      await auth.user?.notify(new DefaultNotification({ content: 'contenu', title: 'titre' }))
    }

    return response.redirect().back()
  }
}
