import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('recipes')
        .addColumn('serves', 'text', (col) =>
            col.defaultTo('2').notNull()
        )
        .addColumn('time', 'text', (col) =>
             col.defaultTo('30 minutes').notNull()
        )
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.alterTable('items')
        .dropColumn('serves')
        .dropColumn('time')
        .execute()
}