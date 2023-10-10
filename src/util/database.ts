import { Database } from './types';
import { Pool } from 'pg';
import { Kysely, PostgresDialect, Migrator, FileMigrationProvider, MigrationResultSet } from 'kysely';
import * as path from 'path'
import { promises as fs } from 'fs'

const DB_HOST = process.env.POSTGRES_HOST || '';
const DB_PORT: number = +(process.env.POSTGRES_PORT || 0);

const dialect = new PostgresDialect({
    pool: new Pool ({
        database: "local_pantry",
        host: DB_HOST,
        user: "postgres",
        password: "p@ntry!",
        port: DB_PORT
    })
});

export const db = new Kysely<Database>({
    dialect,
});

export async function initdb() {
    try {
        const migrator = new Migrator({
            db,
            provider: new FileMigrationProvider({
                fs,
                path,
                migrationFolder: path.join(__dirname, '../../db'),
            }),
        });
        const migrationResult: MigrationResultSet = await migrator.migrateToLatest();
        if (migrationResult.error) {
            throw new Error("initdb() failed. " + JSON.stringify(migrationResult))
        };
    } catch (error) {
        console.log("Failed to initdb. " + error);
    };
};