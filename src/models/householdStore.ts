import { db } from '../util/database'
import { HouseholdsTable, NewHousehold, User } from '../util/types';

export async function CreateHousehold(household: NewHousehold) {
    return await db.insertInto('households')
        .values(household)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function GetHouseholdById(id: number) {
    return await db.selectFrom('users')
        .where('household_id', '=', id)
        .selectAll()
        .execute();
}
