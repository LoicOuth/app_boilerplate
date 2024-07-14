import Notification from '#notifications/models/notification'
import { HttpContext } from '@adonisjs/core/http'
import DefaultNotification from '#notifications/default_notification'

export default class NotificationsController {
  async markAsRead({ response, request }: HttpContext) {
    const notification = await Notification.findOrFail(request.param('id'))

    await notification.markAsRead()

    return response.redirect().back()
  }

  async delete({ response, request }: HttpContext) {
    const notification = await Notification.findOrFail(request.param('id'))

    await notification.delete()

    return response.redirect().back()
  }

  async sendNotif({ auth, response }: HttpContext) {
    await auth.user?.notify(new DefaultNotification({ content: 'contenu', title: 'titre' }))

    return response.redirect().back()
  }
}
