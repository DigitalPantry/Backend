import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  households: HouseholdsTable
  users: UsersTable
}

//HOUSEHOLD
export interface HouseholdsTable {
  id: Generated<number>
  name: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Household = Selectable<HouseholdsTable>
export type NewHousehold = Insertable<HouseholdsTable>
export type HouseholdUpdate = Updateable<HouseholdsTable>

//USER
export interface UsersTable {
  id: Generated<number>
  first_name: string
  last_name: string
  email: string
  password: string
  household_id: number
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>

//ITEM

//RECIPE

//LIST?