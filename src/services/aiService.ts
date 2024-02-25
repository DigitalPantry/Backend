import { Request, Response } from "express";
import { NewRecipe } from "../util/types";

import OpenAI from 'openai';
import { InsertRecipe } from "../models/recipeStore";

// GenerateRecipe calls the ChatGPT API and gets a new recipe using
// only the provided ingredients
export async function GenerateRecipe(household_id:number, ingredients: string[]) {   
    const openai = new OpenAI();
    
    try {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: [{ role: 'user', content: `
            Suggest a recipe using only the following ingredients. You do not need to use them all, but you cannot use anything else.
            Return the recipe in JSON format as follows:
            {
            name: (recipe name)
            ingredients: [
                (list ingredients in this array)
            ], 
            directions: [
            (list directions in this array, with each step being one string in the array)
            ]
            }

            List of available ingredients:
            ${ingredients}
            `}],
            model: 'gpt-3.5-turbo',
        };
          
        const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
        if (chatCompletion.choices.length == 0) {
        return null;
        }
        const messageContent = chatCompletion.choices[0].message.content
        if (!messageContent) {
        return null;
        }
        const json = JSON.parse(messageContent);
        if(!json.name || !json.ingredients || !json.directions) {
            return null;
        }
        
        const recipe: NewRecipe = {
            household_id: household_id,
            name: json.name,
            ingredients: json.ingredients,
            directions: json.directions
        }
        return InsertRecipe(recipe);
        
      } catch (error) {
        return null;
      }
}