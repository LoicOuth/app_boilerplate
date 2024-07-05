import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Notification from '#models/notification'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import NotificationService from '#services/notification_service'
import { NotificationContract } from '#types/notification'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare avatar: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>

  async unreadNotifications(this: User) {
    return await this.related('notifications')
      .query()
      .whereNull('readAt')
      .orderBy('createdAt', 'desc')
  }

  async readNotifications(this: User) {
    return await this.related('notifications')
      .query()
      .whereNotNull('readAt')
      .orderBy('createdAt', 'desc')
  }

  async notify(this: User, notification: NotificationContract) {
    await NotificationService.send(this, notification)
  }
}
