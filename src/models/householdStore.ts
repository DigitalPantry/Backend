import { db } from '../util/database'
import { HouseholdTable, NewHouseHold } from '../util/types';

export async function CreateHousehold(name: string) {
    const household: NewHouseHold = {
        name: name,
    }
    return await db.insertInto('household')
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