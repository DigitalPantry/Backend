import { Request, Response } from 'express';
import { CreateUser, GetUsersByHousehold, RemoveUserFromHousehold } from '../models/userStore'
import { GetHouseholdById } from '../models/householdStore';

export const GetHouseholdUsers = async (req: Request, res: Response) => {
    const { householdString } = req.query;
    if (!householdString) {
        return res.status(400).send({
            success: false,
            error: "invalid household parameter"
        })
    }
    
    const id = +householdString;
    
    const users = await GetUsersByHousehold(id);
    
    res.status(200).send({
        success: true,
        users: users
    });
}

export const NewHouseholdUser =  async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;
    
    const { householdString } = req.query;
    if (!householdString) {
        return res.status(400).send({
            success: false,
            error: "invalid household parameter"
        })
    }
    
    const id = +householdString;
    
    const household = await GetHouseholdById(id);
    if (!household) {
        return res.status(400).send({
            success: false,
            error: "invalid household id"
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
        return res.status(400).send({
            success: false,
            error: "invalid id parameter"
        })
    }
    
    if (!householdString) {
        return res.status(400).send({
            success: false,
            error: "invalid household parameter"
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
                res.status(500).send({
                    success: false,
                    error: "unknown error removing user from household"
                });
            }
        }
    }    
    
    res.status(404).send({
        success: false,
        error: "user not found"
    });
}