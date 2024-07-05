import User from '#models/user'

export const NotificationTypeArray = ['default']

export type NotificationType = (typeof NotificationTypeArray)[number]

export interface DefaultValueInterface {
  title: string
  content: string
}

export interface NotificationContract {
  via: 'email' | 'database'
  toDatabase?: (user: User) => Promise<void>
  toEmail?: (user: User) => Promise<void>
}
