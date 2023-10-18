import { db } from '../util/database'
import { User, UserUpdate, NewUser } from '../util/types'

export async function CreateUser(user: NewUser) {
    return await db.insertInto('users')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function GetUserById(id: number) {
    return await db.selectFrom('users')
        .where('id', '=', id)
        .selectAll()
        .execute();
}

export async function GetUsersByHousehold(id: number) {
    return await db.selectFrom('users')
        .where('household_id', '=', id)
        .selectAll()
        .execute();
}

export async function RemoveUserFromHousehold(id: number) {
    return await db.deleteFrom('users')
        .where('id', '=', id)
        .execute();
}