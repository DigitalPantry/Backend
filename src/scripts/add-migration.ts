const fs = require('fs');
const path = require('path');
const moment = require('moment');

const content = `import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    
}

export async function down(db: Kysely<any>): Promise<void> {
    
}
`;

const currentDate = moment().format('YYYYMMDDHHmmss');
const fileName = `${currentDate}-new-migration.ts`;
const filePath = path.join(__dirname, '../../db', fileName);

fs.writeFileSync(filePath, content);
console.log(`Migration file created. ${filePath}`);