import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary()
        table.string('snsId')
        table.string('title')
        table.string('content')
        table.string('posting_password')
        table.jsonb('images').defaultTo({})
        table.jsonb('options').defaultTo({})
        table.dateTime('created_at').defaultTo(knex.fn.now())
        table.dateTime('updated_at').defaultTo(knex.fn.now())
        table.dateTime('deleted_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('posts')
}

