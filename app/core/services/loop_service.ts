import { inject } from '@adonisjs/core'
import HttpService from '#core/services/http_service'
import env from '#start/env'
import type {
  CreateContactBody,
  CreateContactResponse,
  DefaultResponse,
  TransactionalEmailBody,
} from '#core/types/loop_types'

@inject()
export default class LoopService {
  private readonly headers: Headers = new Headers()
  private readonly loopApiUrl: string

  constructor(private readonly http: HttpService) {
    this.loopApiUrl = env.get('LOOP_API_URL')
    this.headers.append('Authorization', `Bearer ${env.get('LOOP_API_KEY')}`)
  }

  sendTransactionalEmail(body: TransactionalEmailBody) {
    return this.http.post<DefaultResponse, TransactionalEmailBody>(
      `${this.loopApiUrl}/transactional`,
      body,
      this.headers
    )
  }

  createContact(body: CreateContactBody) {
    return this.http.post<CreateContactResponse, CreateContactBody>(
      `${this.loopApiUrl}/contacts/create`,
      body,
      this.headers
    )
  }
}
