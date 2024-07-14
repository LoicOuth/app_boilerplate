export const NotificationTypeArray = ['default']

export type NotificationType = (typeof NotificationTypeArray)[number]

export interface DefaultValueInterface {
  title: string
  content: string
}
