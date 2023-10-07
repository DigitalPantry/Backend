import { Request, Response } from 'express';
import { CreateUser, GetUserById } from '../models/userStore'
import { create } from 'domain';

// Testing endpoint
export const HelloWorld = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        success: true,
        message: 'hello world!',
    });
}

export const NewUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    
    const createdUser = await CreateUser(name, email);
    
    res.status(200).send({
        success: true,
        user: createdUser
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
    const id = +idString
    
    const user = await GetUserById(id);
    
    res.status(200).send({
        success: true,
        user: user
    });
}