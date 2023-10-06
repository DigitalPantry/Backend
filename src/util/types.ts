import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
    users: UsersTable
}

export interface UsersTable {
    id: Generated<number>
    name: string
    email: string
}

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>