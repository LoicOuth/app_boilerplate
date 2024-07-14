import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NotificationsController = () => import('#notifications/controllers/notifications_controller')

router
  .group(() => {
    router.post('/', [NotificationsController, 'sendNotif']).as('notif')
    router.patch('/:id', [NotificationsController, 'markAsRead']).as('notif.read')
    router.delete('/:id', [NotificationsController, 'delete']).as('notif.delete')
  })
  .prefix('/notifications')
  .middleware([middleware.auth()])
