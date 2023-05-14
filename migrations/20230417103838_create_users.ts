import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary()

		table.string('email').unique()

		table.string('name')
		table.string('nickname')
		table.string('password')
		table.string('phone')
		table.string('picture')
		table.string('role')
		table.string('birth')
		table.string('is_adult')

		table.string('tenant_id').index()

		table.jsonb('options').defaultTo({})
		table.jsonb('provider_data').defaultTo({})

		table.index(['options'], 'users_options_index', 'GIN')
		table.index(['provider_data'], 'users_provider_data_index', 'GIN')

		table.datetime('email_verified_at')
		table.datetime('phone_verified_at')

		table.dateTime('created_at').defaultTo(knex.fn.now())
		table.dateTime('updated_at').defaultTo(knex.fn.now())

		table.dateTime('last_sign_in_at').defaultTo(knex.fn.now())

		table.dateTime('blocked_at')
		table.dateTime('deleted_at')
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users')
}
