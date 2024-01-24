import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('recipes')
        .ifNotExists()
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('household_id', 'integer', (col) =>
            col.references('households.id').notNull()
        )
        .addColumn('ingredients', sql`text[]`)
        .addColumn('directions', sql`text[]`)
        .addColumn('created_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .execute()

    await db.schema
        .createIndex('recipes_household_id_index')
        .on('recipes')
        .column('household_id')
        .execute()

    await db
        .insertInto('recipes')
        .values({
            name: 'Test Recipe',
            household_id: 1,
            ingredients: ["100 grams flour", "50 grams water"],
            directions: ["mix together", "bake at 350 degreees for 10 minutes"]
        })
        .executeTakeFirst()
        
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable('recipes')
        .execute()
}
