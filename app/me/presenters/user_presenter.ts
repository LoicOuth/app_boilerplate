import User from '#auth/models/user'

export class UserPresenter {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare email: string
  declare avatar: string
  declare createdAt: string

  constructor(user: User) {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.avatar = user.avatar
    this.createdAt = user.createdAt.toString()
  }
}
