import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('households')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .execute()

    await db.schema
        .createTable('users')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('first_name', 'varchar', (col) => col.notNull())
        .addColumn('last_name', 'varchar')
        .addColumn('email', 'varchar(240)', (col) => col.notNull())
        .addColumn('password', 'varchar(240)', (col) => col.notNull())
        .addColumn('household_id', 'integer', (col) =>
            col.references('households.id').notNull()
        )
        .addColumn('house_owner', 'integer', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .execute()

    await db.schema
        .createIndex('user_household_id_index')
        .on('users')
        .column('household_id')
        .execute()

    await db
        .insertInto('households')
        .values({
            name: 'Test Household',
        })
        .executeTakeFirst()

    await db
        .insertInto('users')
        .values({
            first_name: 'Test',
            last_name: 'User',
            email: 'test@gmail.com',
            password: 'password123',
            household_id: 1,
            house_owner: 1
        })
        .executeTakeFirst()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('users').execute()
    await db.schema.dropTable('households').execute()
}