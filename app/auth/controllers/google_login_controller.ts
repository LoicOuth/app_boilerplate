import AuthProvider from '#auth/models/auth_provider'
import User from '#auth/models/user'
import { ToastService } from '#core/services/toast_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class GoogleLoginController {
  async redirect({ ally, inertia }: HttpContext) {
    const redirectUrl = await ally.use('google').getRedirectUrl()
    return inertia.location(redirectUrl)
  }

  @inject()
  async handle({ ally, auth, response }: HttpContext, toast: ToastService) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      toast.error('Access denied')

      return response.redirect().toRoute('login.index')
    }

    if (google.stateMisMatch()) {
      toast.error('Request expired. Retry again')

      return response.redirect().toRoute('login.index')
    }

    if (google.hasError()) {
      toast.error(google.getError()!)

      return response.redirect().toRoute('login.index')
    }

    const googleUser = await google.user()
    const nameSplited = googleUser.name.split(' ')
    const userData = {
      email: googleUser.email,
      firstName: nameSplited[0],
      lastName: nameSplited[1] || '',
      avatar: googleUser.avatarUrl,
      password: '',
    }

    let user = await User.query()
      .whereHas('authProviders', (query) => {
        query
          .where('providerName', 'google')
          .where('providerId', googleUser.id)
          .where('isConnectedWith', true)
      })
      .preload('authProviders')
      .first()

    if (user) {
      await user.merge(userData).save()
    } else {
      user = await User.create(userData)
      await AuthProvider.create({ providerId: googleUser.id, userId: user.id })
    }

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
