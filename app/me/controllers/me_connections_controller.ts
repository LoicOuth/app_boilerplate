import { assertExists } from '@adonisjs/core/helpers/assert'
import { HttpContext } from '@adonisjs/core/http'

export default class MeConnectionsController {
  async render({ inertia, auth }: HttpContext) {
    assertExists(auth.user, 'User is not authenticated')

    await auth.user.load('authProviders')

    return inertia.render('me/Connections', {
      providers: auth.user.authProviders.map((provider) => provider.projection()),
    })
  }
}
