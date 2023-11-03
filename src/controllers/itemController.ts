import { Request, Response } from "express";
import { RemoveItemById, UpdateItemById } from '../models/itemStore'



export const UpdateItem = async (req: Request, res: Response) => {
    const { idString, name, category, expiration, quantity, household_id, found_in } = req.body

    if (!idString) {
        return res.status(200).send({
            success: false,
            message: "Invalid id parameter"
        })
    }

    const id = +idString
    const updatedItem = await UpdateItemById(idString, {id, name, category, expiration, quantity, household_id, found_in})

    res.status(200).send({
        success: true,
        message: "Item successfully updated"
    });

}

export const RemoveItem = async (req: Request, res: Response) => {
    const { idString } = req.query

    console.log(req.body)

    if (!idString) {
        return res.status(200).send({
            success: false,
            message: "Invalid id"
        })
    } else {
        const id = +idString
        const removed = await RemoveItemById(id)
        res.status(200).send({
            success: true,
            message: "Item successfully deleted"
        })
    }

}
