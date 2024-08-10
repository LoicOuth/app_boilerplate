import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const GoogleLoginController = () => import('#auth/controllers/google_login_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterController = () => import('#auth/controllers/register_controller')
const ForgotPasswordController = () => import('#auth/controllers/forgot_password_controller')
const ResetPasswordController = () => import('#auth/controllers/reset_password_controller')
const ValidateAccountController = () => import('#auth/controllers/validate_account_controller')

router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login.index')
    router.post('/login', [LoginController, 'handle']).as('login.handle')
    router.get('/register', [RegisterController, 'render']).as('register.index')
    router.post('/register', [RegisterController, 'handle']).as('register.handle')

    /*
      GOOGLE LOGIN  
    */
    router.get('/google/redirect', [GoogleLoginController, 'redirect']).as('google.login.index')
    router.get('/google/callback', [GoogleLoginController, 'handle']).as('google.login.handle')

    /*
      FORGOT/RESET PASSWORD 
    */
    router.get('/password/forgot', [ForgotPasswordController, 'render']).as('forgot-password.index')
    router
      .post('/password/forgot', [ForgotPasswordController, 'handle'])
      .as('forgot-password.handle')
    router
      .get('/password/reset/:id', [ResetPasswordController, 'render'])
      .as('reset-password.index')
    router.post('/password/reset', [ResetPasswordController, 'handle']).as('reset-password.handle')

    router
      .get('/account/:id/validate', [ValidateAccountController, 'handle'])
      .as('validate-account.index')
  })
  .middleware([middleware.guest()])

router
  .post('/logout', [LogoutController, 'handle'])
  .as('logout.handle')
  .middleware([middleware.auth()])
