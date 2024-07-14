import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#dashboard/controllers/dashboard_controller')
router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'render']).as('dashboard.index')
  })
  .middleware(middleware.auth())
