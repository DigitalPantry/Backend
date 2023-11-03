import { db } from '../util/database'
import { Item, NewItem, ItemUpdate } from '../util/types'

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