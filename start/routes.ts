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
const ToogleThemeController = () => import('#controllers/me/toggle_theme_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', [HomeController, 'render']).as('home.index')
router.get('/about', (ctx) => ctx.inertia.render('about'))

router.get('/login', [LoginController, 'render']).as('login.index')
router.post('/login', [LoginController, 'handle']).as('login.handle')
router.get('/register', [RegisterController, 'render']).as('register.index')
router.post('/register', [RegisterController, 'handle']).as('register.handle')

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'render']).as('dashboard.index')
  })
  .middleware(middleware.auth())

router
  .group(() => {
    router.post('/theme', [ToogleThemeController, 'handle']).as('me.theme')
  })
  .prefix('me')
