import { Request, Response } from 'express';
import { CreateUser, GetUserById } from '../models/userStore'
import { CreateHousehold } from '../models/householdStore';

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