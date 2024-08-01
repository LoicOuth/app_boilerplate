import User from '#auth/models/user'
import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class ForgotPasswordMail extends BaseMail {
  from = 'No reply'
  subject = 'Password Reset Request for Your [Company/Website] Account'

  constructor(
    protected token: string,
    protected user: User
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const url = `${env.get('APP_URL')}/password/reset?token=${this.token}`

    this.message.to(this.user.email).htmlView('emails/forgot_password', { user: this.user, url })
  }
}
