import { db } from '../util/database'
import { User, UserUpdate, NewUser } from '../util/types'

export async function CreateUser(name: string, email: string) {
    const user: NewUser = {
        name: name,
        email: email
    }
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