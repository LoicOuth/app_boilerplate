import Notification from '#models/notification'
import User from '#models/user'
import { ModelAttributes } from '@adonisjs/lucid/types/model'

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

export interface NotificationInertia
  extends Omit<ModelAttributes<Notification>, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}
