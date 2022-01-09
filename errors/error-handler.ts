import { Request, Response } from "express";

export default function errorHandler(error: Error, req: Request, res: Response){
    if(error instanceof UserNotFoundError){
        res.status(404);
        res.send(error.message);
    } else if(error instanceof InvalidPasswordError){
        res.send(error.message);
    } else {
        res.status(500);
        res.send("An unknown error has occured.");
    }
}

export class UserNotFoundError extends Error{

    constructor(message: string){
        super(message);
    }
}

export class InvalidPasswordError extends Error{
    
    constructor(message: string){
        super(message);
    }
}