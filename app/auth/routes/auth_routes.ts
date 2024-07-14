import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterController = () => import('#auth/controllers/register_controller')

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
