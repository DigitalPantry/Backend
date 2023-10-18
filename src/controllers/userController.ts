import { Request, Response } from 'express';
import { CreateUser, GetUserById, GetUsersByHousehold, RemoveUserFromHousehold } from '../models/userStore'
import { CreateHousehold, GetHouseholdById } from '../models/householdStore';

// Testing endpoint
export const HelloWorld = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        success: true,
        message: 'hello world!',
    });
}

export const NewUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    const createdHousehold = await CreateHousehold({name: first_name + "'s Household"});
    
    const createdUser = await CreateUser({first_name, last_name, email, password, household_id: createdHousehold.id});
    
    res.status(200).send({
        success: true,
        user: createdUser,
        household: createdHousehold
    });
}

export const GetUser = async (req: Request, res: Response) => {
    const { idString } = req.query;
    if (!idString) {
        return res.status(400).send({
            success: false,
            error: "invalid id parameter"
        })
    }
    const id = +idString;
    
    const user = await GetUserById(id);
    
    res.status(200).send({
        success: true,
        user: user
    });
}

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
                return res.status(200).send('User deleted successfully');
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