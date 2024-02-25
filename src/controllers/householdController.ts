import { Request, Response } from 'express';
import { CreateUser, GetUsersByHousehold, RemoveUserFromHousehold } from '../models/userStore'
import { CreateHousehold, GetHouseholdById } from '../models/householdStore';

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
    
    const createdUser = await CreateUser({first_name, last_name, email, password, house_owner: 0, household_id: id});
    
    res.status(200).send({
        success: true,
        user: createdUser
    });
}

export const RemoveUser = async (req: Request, res: Response) => {
    const { idString, houseId } = req.query;
    
    if (!idString) {
        return res.status(200).send({
            success: false,
            message: "invalid id parameter"
        })
    }
    
    if (!houseId) {
        return res.status(200).send({
            success: false,
            message: "invalid household parameter"
        })
    }
    
    const userId = +idString;
    const householdId = +houseId;
    
    const users = await GetUsersByHousehold(householdId);
    for (var user of users) {
        if (user.id === userId) {
            let newHouseId = await CreateHousehold({name: user.first_name + "'s Household"});
            const result = await RemoveUserFromHousehold(userId, newHouseId.id);
            if (!!result) {
                const updatedUsers = await GetUsersByHousehold(householdId);
                return res.status(200).send({
                    updatedUsers,
                    success: true,
                    message: "Successfully removed user from household"
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