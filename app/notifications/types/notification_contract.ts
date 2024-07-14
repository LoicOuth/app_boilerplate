import User from '#auth/models/user'

export interface NotificationContract {
  via: 'email' | 'database'
  toDatabase?: (user: User) => Promise<void>
  toEmail?: (user: User) => Promise<void>
}
