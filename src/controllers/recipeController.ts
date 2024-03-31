import { Request, Response } from "express";
import { RemoveRecipeById, UpdateRecipeById, InsertRecipe, GetRecipesByHousehold } from '../models/recipeStore'
import { NewRecipe } from '../util/types'
import { GetItemNamesByHousehold, GetItemsByHousehold } from "../models/itemStore";
import { GenerateRecipe } from "../services/aiService";

export const UpsertRecipe = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
         return CreateRecipe(req, res);
    }
    return UpdateRecipe(req, res);
}

export const UpdateRecipe = async (req: Request, res: Response) => {
    const { id, name, household_id, directions, ingredients, serves, time  } = req.body

    if (!id) {
        return res.status(400).send({
            success: false,
            message: "Invalid id parameter"
        })
    }

    const item = {
        name: name,
        household_id: household_id,
        directions: directions,
        ingredients: ingredients,
        serves: serves,
        time: time
    }
    
    const updatedItem = await UpdateRecipeById(+id, item)

    
    res.status(200).send({
        success: true,
        message: "Recipe successfully updated"
    });

}

export const RemoveRecipe = async (req: Request, res: Response) => {
    const { idString } = req.query

    if (!idString) {
        return res.status(400).send({
            success: false,
            message: "Invalid id"
        })
    }
    
    const id = +idString
    const removed = await RemoveRecipeById(id)
    res.status(200).send({
        success: true,
        message: "Item successfully deleted"
    })
}

export const CreateRecipe = async (req: Request, res: Response) => {
    const { name, household_id, directions, ingredients, serves, time} = req.body;
    
    if (!household_id) {
        return res.status(400).send({
            success: false,
            message: "Invalid household_id parameter"
        });
    }
    
    const id = +household_id;
    
    const recipe: NewRecipe = {
        name: name,
        household_id: household_id,
        directions: directions,
        ingredients: ingredients,
        serves: serves,
        time: time
    }
    
    const result = await InsertRecipe(recipe);
    res.status(200).send({
        success: true,
        recipe: result
    });
}

export const GetHouseholdRecipes = async (req: Request, res: Response) => { 
    const { household_id } = req.query;
    
    if (!household_id) {
        return res.status(400).send({
            success: false,
            message: "Invalid household_id parameter"
        });
    }
    const id = +household_id;
    
    // order determines how the results will be ordered
    // search returns only items with a name containing the provided string
    const { order, search} = req.query;
    
    // these are filters, if present the results will only contain exact matches
    // the name field here differs from the search - search will find all items with names that 
    // contain the string. the name filter here must be an exact match.
    const filters = {
        name: req.query.name,
    }
    
    const result = await GetRecipesByHousehold(id, order, search, filters);
    if (!result) {
        return res.status(500).send({
            success: false,
            message: "Unknown error executing db query"
        });
    }
    console.log(result);
    
    res.status(200).send({
        success: true,
        recipes: result
    });
}

export const GetAIRecipe = async (req: Request, res: Response) => {
    const { household_id } = req.query;
    
    if (!household_id) {
        return res.status(400).send({
            success: false,
            message: "Invalid household_id parameter"
        });
    }
    const id = +household_id;
    
    // Get a list of ingredients in the current household pantry
    const ingredientResult = await GetItemNamesByHousehold(id);
    let ingredients:string[] = [];
    ingredientResult.map(i => {
        ingredients.push(i.name);
    })
    const generatedRecipe = await GenerateRecipe(id, ingredients);
    if (generatedRecipe === null) {
        res.status(500).send({
            success: false,
            recipe: null
        });
        return
    }

    res.status(200).send({
        success: true,
        recipe: generatedRecipe
    });
}