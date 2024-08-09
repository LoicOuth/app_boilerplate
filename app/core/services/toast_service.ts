import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { ToastErrorKey, ToastSucessKey } from '#core/types/toast_types'

@inject()
export class ToastService {
  constructor(private context: HttpContext) {}

  success(message: string) {
    this.context.session.flash(ToastSucessKey, {
      message,
    })
  }

  error(message: string) {
    this.context.session.flash(ToastErrorKey, {
      message,
    })
  }
}
