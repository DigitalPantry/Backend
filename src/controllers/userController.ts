import { Request, Response } from 'express';
import { CreateUser, GetUserById, UpdateUserById, GetUserByEmail } from '../models/userStore'
import { CreateHousehold } from '../models/householdStore';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Testing endpoint
export const HelloWorld = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        success: true,
        message: 'hello world!',
    });
}

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await GetUserByEmail(email);

    if (existingUser?.length > 0) {
        const validPassword = await checkPassword(password, existingUser[0].password);

        if (validPassword) {
            res.status(200).send({
                user: existingUser[0],
                success: true,
                message: "Login successful.",
            });
        } else {
            res.status(200).send({
                user: null,
                success: false,
                message: "Invalid password",
            });
        }
    } else {
        res.status(200).send({
            success: false,
            message: "Email not found.",
        })
    }
}

export const NewUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    const createdHousehold = await CreateHousehold({name: first_name + "'s Household"});
    const hashedPassword = await hashPassword(password);
    const createdUser = await CreateUser({first_name, last_name, email: email?.toLowerCase(), password: hashedPassword, house_owner: 1, household_id: createdHousehold.id});
    
    res.status(200).send({
        user: createdUser,
        household: createdHousehold,
        success: true,
        message: "Registration successful."
    });
}

export const NewHHMember = async(req: Request, res: Response) => {
    const { first_name, last_name, email, password, household_id} = req.body
    
    const hashedPassword = await hashPassword(password); 
    const newMember = await CreateUser({first_name, last_name, email: email?.toLowerCase(), password: hashedPassword, house_owner: 0, household_id: household_id});

    res.status(200).send({
        user: newMember,
        success: true,
        message: "New Member Successfully Added"
    })
}

export const GetUser = async (req: Request, res: Response) => {
    const { idString } = req.query;
    if (!idString) {
        return res.status(200).send({
            success: false,
            message: "invalid id parameter"
        })
    }
    const id = +idString;
    
    const user = await GetUserById(id);
    
    res.status(200).send({
        success: true,
        user: user
    });
}

export const UpdateUser = async (req: Request, res: Response) => {
    const { id, first_name, last_name, email, password, household_id } = req.body;

    if (!id) {
        return res.status(200).send({
            success: false,
            message: "invalid id parameter"
        })
    } else {
        const idNum = +id

        const hashedPassword = await hashPassword(password);
        const updatedUser = await UpdateUserById(idNum, {id, first_name, last_name, email, password: hashedPassword, household_id})

        res.status(200).send({
            success: true,
            message: "User successfully updated"
        });
    }
}

function checkPassword(clearText: string, existing: string): Promise<boolean> {
    return new Promise((fullfill, reject) => {
        bcrypt.compare(clearText, existing, (error, res) => {
            if (error)
                reject(error);
            else
                fullfill(res);
        });
    });
}

function hashPassword(clearText: string): Promise<string> {
    return new Promise((fulfill, reject) => {
        bcrypt.hash(clearText, SALT_ROUNDS, (error, hash) => {
            if (error)
                reject(error);
            else
                fulfill(hash);
        });
    });
}