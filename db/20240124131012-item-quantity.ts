import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable('items')
        .addColumn('units', 'varchar', (col) =>
            col.defaultTo('grams').notNull()
        )
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.alterTable('items').dropColumn('units').execute()
}
