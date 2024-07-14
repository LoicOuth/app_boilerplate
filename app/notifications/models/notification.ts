import { DateTime } from 'luxon'
import { afterCreate, afterDelete, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import {
  type DefaultValueInterface,
  type NotificationType,
} from '#notifications/types/notification_type'
import User from '#auth/models/user'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import emitter from '@adonisjs/core/services/emitter'
import { NotificationPresenter } from '#notifications/presenters/notification_presenter'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: NotificationType

  @column({
    prepare: (value) => JSON.stringify(value),
    consume: (value: string | DefaultValueInterface) =>
      typeof value === 'string' ? JSON.parse(value) : value,
  })
  declare value: DefaultValueInterface

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare readAt: DateTime | null

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  async markAsRead(this: Notification) {
    await this.merge({ readAt: DateTime.now() }).save()

    emitter.emit('read:notification', this)
  }

  async markAsUnread(this: Notification) {
    await this.merge({ readAt: null }).save()
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @afterCreate()
  static newNotification(notification: Notification) {
    emitter.emit('new:notification', notification)
  }

  @afterDelete()
  static deleteNotification(notification: Notification) {
    emitter.emit('delete:notification', notification)
  }

  projection() {
    return new NotificationPresenter(this)
  }
}
