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

export async function UpdateUserById(id: number, user: UserUpdate) {
    return await db.updateTable('users')
        .set({ first_name: user.first_name, last_name: user.last_name, email: user.email, 
                password: user.password, household_id: user.household_id })
        .where('id', '=', id)
        .execute();
}

export async function GetUserByEmail(email: string) {
    return await db.selectFrom('users')
        .where('email', '=', email)
        .selectAll()
        .execute();
}