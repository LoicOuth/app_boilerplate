import User from '#auth/models/user'

export class UserPresenter {
  declare id: number
  declare name: string
  declare email: string
  declare avatar: string
  declare createdAt: string
  declare isConnectedWithProvider: boolean

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.avatar = user.avatar.includes('https') ? user.avatar : `/${user.avatar}`
    this.createdAt = user.createdAt.toString()
  }

  static async build(user: User): Promise<UserPresenter> {
    const presenter = new UserPresenter(user)
    presenter.isConnectedWithProvider = !!(await user.connectedAuthProvider())
    return presenter
  }
}
