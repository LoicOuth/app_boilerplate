import { ToastService } from '#core/services/toast_service'
import { inject } from '@adonisjs/core'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class MeSecurityController {
  static validator = vine.compile(
    vine.object({
      password: vine.string().minLength(8).confirmed(),
    })
  )

  async render({ inertia }: HttpContext) {
    return inertia.render('me/security')
  }

  @inject()
  async handle({ response, request, auth }: HttpContext, toast: ToastService) {
    assertExists(auth.user, 'User is not authenticated')
    const { password } = await request.validateUsing(MeSecurityController.validator)

    await auth.user.merge({ password }).save()

    toast.success(`Votre compte a été mis à jour`)

    return response.redirect().toRoute('me.security.render')
  }
}
