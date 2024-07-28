import AuthProvider from '#auth/models/auth_provider'
import { type AuthProviderNames } from '#types/common'

export class AuthProviderPresenter {
  declare id: number
  declare providerName: AuthProviderNames
  declare isConnectedWith: boolean
  declare createdAt: string

  constructor(provider: AuthProvider) {
    this.id = provider.id
    this.providerName = provider.providerName
    this.isConnectedWith = provider.isConnectedWith
    this.createdAt = provider.createdAt.toString()
  }
}
