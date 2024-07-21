import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export class ToastService {
  constructor(private context: HttpContext) {}

  success(message: string) {
    this.context.session.flash('toast_success', {
      message,
    })
  }

  error(message: string) {
    this.context.session.flash('toast_error', {
      message,
    })
  }
}
