import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
    users: UsersTable
    household: HouseholdTable
}

export interface UsersTable {
    id: Generated<number>
    name: string
    email: string
}

export interface HouseholdTable {
    id: Generated<number>
    name: string
}

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>

export type NewHouseHold = Insertable<HouseholdTable>