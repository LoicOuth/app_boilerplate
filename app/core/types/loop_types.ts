export interface TransactionalEmailBody {
  email: string
  transactionalId: string
  addToAudience?: boolean
  dataVariables?: Record<string, string | number>
}
export interface DefaultResponse {
  success: boolean
}

export interface CreateContactBody {
  email: string
  firstName?: string
  lastName?: string
  source?: string
  subscribed?: boolean
  userGroup?: string
  userId?: string
  mailingLists?: Record<string, boolean>
}
export interface CreateContactResponse extends DefaultResponse {
  id: string
}
