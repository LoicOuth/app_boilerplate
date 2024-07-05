/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

const RegisterController = () => import('#controllers/auth/register_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', [HomeController, 'render']).as('home.index')
router.get('/about', (ctx) => ctx.inertia.render('public/about'))

router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login.index')
    router.post('/login', [LoginController, 'handle']).as('login.handle')
    router.get('/register', [RegisterController, 'render']).as('register.index')
    router.post('/register', [RegisterController, 'handle']).as('register.handle')
  })
  .middleware([middleware.guest()])

router
  .post('/logout', [LogoutController, 'handle'])
  .as('logout.handle')
  .middleware([middleware.auth()])

router
  .post('/notification', [HomeController, 'sendNotif'])
  .as('notif')
  .middleware([middleware.auth()])

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'render']).as('dashboard.index')
  })
  .middleware(middleware.auth())
