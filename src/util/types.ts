import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  households: HouseholdsTable
  users: UsersTable
  items: ItemsTable
  recipes: RecipesTable
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
export interface ItemsTable {
  id: Generated<number>
  name: string
  category: string
  expiration: Date
  quantity: string
  units: string | undefined
  household_id: number
  found_in: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Item = Selectable<ItemsTable>
export type NewItem = Insertable<ItemsTable>
export type ItemUpdate = Updateable<ItemsTable>

//RECIPE
export interface RecipesTable {
  id: Generated<number>
  name: string
  household_id: number
  ingredients: string[]
  directions: string[]
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}


export type Recipe = Selectable<RecipesTable>
export type NewRecipe = Insertable<RecipesTable>
export type RecipeUpdate = Updateable<RecipesTable>

//LIST?