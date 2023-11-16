import { Request, Response } from "express";
import { RemoveItemById, UpdateItemById, InsertItem, GetItemsByHousehold } from '../models/itemStore'
import { NewItem } from '../util/types'

export const UpsertItem = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
         return CreateItem(req, res);
    }
    return UpdateItem(req, res);
}

export const UpdateItem = async (req: Request, res: Response) => {
    const { id, name, category, expiration, quantity, household_id, found_in } = req.body

    if (!id) {
        return res.status(400).send({
            success: false,
            message: "Invalid id parameter"
        })
    }
    const item = {
        id: +id,
        name: name,
        category: category,
        expiration: expiration,
        quantity: quantity,
        household_id: household_id,
        found_in: found_in
    }
    const updatedItem = await UpdateItemById(+id, item)

    res.status(200).send({
        success: true,
        message: "Item successfully updated"
    });

}

export const RemoveItem = async (req: Request, res: Response) => {
    const { idString } = req.query

    if (!idString) {
        return res.status(400).send({
            success: false,
            message: "Invalid id"
        })
    }
    
    const id = +idString
    const removed = await RemoveItemById(id)
    res.status(200).send({
        success: true,
        message: "Item successfully deleted"
    })
}

export const CreateItem = async (req: Request, res: Response) => {
    const { name, expiration, quantity, household_id, category, found_in } = req.body;
    
    if (!household_id) {
        return res.status(400).send({
            success: false,
            message: "Invalid household_id parameter"
        });
    }
    
    const id = +household_id;
    
    const item: NewItem = {
        name: name,
        category: category,
        expiration: expiration,
        quantity: quantity,
        household_id: household_id,
        found_in: found_in
    }
    
    const result = await InsertItem(item);
    res.status(200).send({
        success: true,
        item: result
    });
}

export const GetHouseholdItems = async (req: Request, res: Response) => { 
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
        category: req.query.category,
        expiresAfter: req.query.expiresAfter,
        expiresBefore: req.query.expiresBefore,
        minQuantity: req.query.minQuantity,
        found_in: req.query.found_in
    }
    
    const result = await GetItemsByHousehold(id, order, search, filters);
    if (!result) {
        return res.status(500).send({
            success: false,
            message: "Unknown error executing db query"
        });
    }
    
    res.status(200).send({
        success: true,
        items: result
    });
}