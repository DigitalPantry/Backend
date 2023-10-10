import { db } from '../util/database'
import { HouseholdsTable, NewHousehold } from '../util/types';

export async function CreateHousehold(household: NewHousehold) {
    return await db.insertInto('households')
        .values(household)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function getHouseholdById(id: number) {
    return await db.selectFrom('users')
        .where('id', '=', id)
        .selectAll()
        .execute();
}