import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_providers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.enum('provider_name', ['google']).defaultTo('google')
      table.string('provider_id').unique()
      table.boolean('is_connected_with').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.unique(['provider_name', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
