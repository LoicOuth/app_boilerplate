import { ToastService } from '#core/services/toast_service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import vine from '@vinejs/vine'
import { unlinkSync } from 'node:fs'

export default class MeDetailsController {
  static validator = vine.compile(
    vine.object({
      name: vine.string(),
      email: vine.string(),
      avatar: vine
        .file({ extnames: ['png', 'jpg', 'jpeg', 'webp', 'svg'], size: '20mb' })
        .optional(),
    })
  )

  async render({ inertia }: HttpContext) {
    return inertia.render('me/details')
  }

  @inject()
  async handle({ response, request, auth }: HttpContext, toast: ToastService) {
    assertExists(auth.user, 'User is not authenticated')
    const { avatar, name, email } = await request.validateUsing(MeDetailsController.validator)

    if (avatar) {
      if (auth.user.avatar) {
        unlinkSync(app.makePath(auth.user.avatar))
      }
      await avatar.move(app.makePath('uploads/avatar'), {
        name: `${cuid()}.${avatar.extname}`,
      })
    }

    await auth.user
      .merge({
        avatar: avatar ? `uploads/avatar/${avatar.fileName}` : avatar,
        email,
        name,
      })
      .save()

    toast.success(`Votre compte a été mis à jour`)

    return response.redirect().toRoute('me.details.render')
  }
}
