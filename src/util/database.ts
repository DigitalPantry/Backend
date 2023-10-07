import { Database } from './types' // this is the Database interface we defined earlier
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const DB_NAME = process.env.POSTGRES_DB || '';
const DB_HOST = process.env.POSTGRES_HOST || '';
const DB_USER = process.env.POSTGRES_USER || '';
const DB_PW = process.env.POSTGRES_PASSWORD || '';
const DB_PORT: number = +(process.env.POSTGRES_PORT || 0);


const dialect = new PostgresDialect({
    pool: new Pool ({
        database: DB_NAME,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PW,
        port: DB_PORT
    })
})

export const db = new Kysely<Database>({
    dialect,
})