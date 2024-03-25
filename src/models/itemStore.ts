import { db } from '../util/database'
import { Item, NewItem, ItemUpdate } from '../util/types'
import { sql } from 'kysely'

export async function InsertItem (item: NewItem) {
    return await db.insertInto('items')
        .values(item)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function UpdateItemById(id: number, item: ItemUpdate) {
    return await db.updateTable('items')
        .set({name: item.name, category: item.category, expiration: item.expiration, units: item.units, quantity: item.quantity,
                household_id: item.household_id, found_in: item.found_in})
        .where('id', '=', id)
        .execute();
}

export async function RemoveItemById(id: number) {
    return await db.deleteFrom('items')
        .where('id', '=', id)
        .execute();
}

export async function GetItemsByHousehold (household_id: number, order: any, search: any, filters: any) {
    let query = db.selectFrom('items')
        .where('household_id', '=', household_id);
    
    if (!!order) {
        query = query.orderBy(order);
    }
    if (!!search) {
        query = query.where('name', 'ilike', `%${search}%`);
    }
    if(!!filters.name) {
        query = query.where("name", "=", filters.name);
    }
    if(!!filters.category) {
        query = query.where("category", "=", filters.category);
    }
    if(!!filters.expiresBefore) {
        query = query.where("expiration", "<=", filters.expiresBefore);
    }
    if(!!filters.expiresAfter) {
        query = query.where("expiration", ">=", filters.expiresAfter);
    }
    if(!!filters.minQuantity) {
        query = query.where("quantity", ">=", filters.minQuantity);
    }
    if(!!filters.found_in) {
        query = query.where("found_in", "=", filters.found_in);
    }
        
    return await query.selectAll().execute();
}

// Used for AI recipe gen, only gets the names
export async function GetItemNamesByHousehold (household_id: number) {
    let query = db.selectFrom('items')
        .where('household_id', '=', household_id)
        .where('found_in', '=', 'Inventory');
        //.where("expiration", ">=", new Date()); // Dont use expired ingredients
        
    return await query.select("name").execute();
}