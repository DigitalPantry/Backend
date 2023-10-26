import { Request, Response } from 'express';
import { CreateUser, GetUsersByHousehold, RemoveUserFromHousehold } from '../models/userStore'
import { GetHouseholdById } from '../models/householdStore';

export const GetHouseholdUsers = async (req: Request, res: Response) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(200).send({
            success: false,
            message: "invalid household parameter"
        })
    }
    
    const idInt = +id;
    const users = await GetUsersByHousehold(idInt);

    res.status(200).send({
        id,
        users: users,
        success: true,
        message: "",
    });
}

export const NewHouseholdUser =  async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;
    
    const { householdString } = req.query;
    if (!householdString) {
        return res.status(200).send({
            success: false,
            message: "invalid household parameter"
        })
    }
    
    const id = +householdString;
    
    const household = await GetHouseholdById(id);
    if (!household) {
        return res.status(200).send({
            success: false,
            message: "invalid household id"
        })
    }
    
    const createdUser = await CreateUser({first_name, last_name, email, password, household_id: id});
    
    res.status(200).send({
        success: true,
        user: createdUser
    });
}

export const RemoveUser = async (req: Request, res: Response) => {
    const { idString, householdString } = req.query;
    
    if (!idString) {
        return res.status(200).send({
            success: false,
            message: "invalid id parameter"
        })
    }
    
    if (!householdString) {
        return res.status(200).send({
            success: false,
            message: "invalid household parameter"
        })
    }
    
    const userId = +idString;
    const householdId = +householdString;
    
    const users = await GetUsersByHousehold(householdId);
    for (var user of users) {
        if (user.id === userId) {
            const result = await RemoveUserFromHousehold(userId);
            if (!!result) {
                return res.status(200).send({
                    success: true
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: "unknown error removing user from household"
                });
            }
        }
    }    
    
    res.status(404).send({
        success: false,
        message: "user not found"
    });
}