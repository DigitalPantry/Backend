import { db } from '../util/database'
import { Item, NewItem, ItemUpdate } from '../util/types'

export async function InsertItem (item: NewItem) {
    return await db.insertInto('items')
        .values(item)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function UpdateItemById(id: number, item: ItemUpdate) {
    return await db.updateTable('items')
        .set({name: item.name, category: item.category, expiration: item.expiration, quantity: item.quantity,
                household_id: item.household_id, found_in: item.found_in})
        .where('id', '=', id)
        .execute();
}

export async function RemoveItemById(id: number) {
    return await db.deleteFrom('items')
        .where('id', '=', id)
        .execute();
}

export async function GetItemsByHousehold (household_id: number) {
    return await db.selectFrom('items')
        .where('household_id', '=', household_id)
        .selectAll()
        .execute();
}