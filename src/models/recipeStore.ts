import { db } from '../util/database'
import { NewRecipe, RecipeUpdate } from '../util/types'

export async function InsertRecipe (recipe: NewRecipe) {
    return await db.insertInto('recipes')
        .values(recipe)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function UpdateRecipeById(id: number, recipe: RecipeUpdate) {
    return await db.updateTable('recipes')
        .set({name: recipe.name, directions: recipe.directions, ingredients: recipe.ingredients,
                household_id: recipe.household_id})
        .where('id', '=', id)
        .execute();
}

export async function RemoveRecipeById(id: number) {
    return await db.deleteFrom('recipes')
        .where('id', '=', id)
        .execute();
}

export async function GetRecipesByHousehold (household_id: number, order: any, search: any, filters: any) {
    let query = db.selectFrom('recipes')
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

    return await query.selectAll().execute();
}