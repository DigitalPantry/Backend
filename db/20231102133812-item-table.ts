import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('items')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar', (col) => col.notNull())
        .addColumn('category', 'varchar', (col) =>
            col.defaultTo('Other').notNull()
        )
        .addColumn('expiration', 'timestamp', (col) => col.notNull())
        .addColumn('quantity', 'varchar(240)', (col) =>
            col.defaultTo(1).notNull()
        )
        .addColumn('household_id', 'integer', (col) =>
            col.references('households.id').notNull()
        )
        .addColumn('found_in', 'varchar', (col) =>
            col.defaultTo('Inventory').notNull()
        )
        .addColumn('created_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .execute()

    await db.schema
        .createIndex('item_household_id_index')
        .on('items')
        .column('household_id')
        .execute()

    await db
        .insertInto('items')
        .values({
            name: 'Milk Gallon',
            category: 'Dairy',
            expiration: '11/20/2023',
            quantity: 1,
            household_id: 1,
        })
        .executeTakeFirst()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable('items')
        .execute()
}
