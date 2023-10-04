import { Request, Response } from 'express';

//Testing endpoint
export const helloWorld = async (req: Request, res: Response) => {
    console.log('request');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).send({
        success: true,
        message: 'hello world!',
    })
}