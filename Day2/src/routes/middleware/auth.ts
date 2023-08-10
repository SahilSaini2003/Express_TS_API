import { Request, Response } from "express";

const token = "Log@in";

export let auth = (req: Request, res: Response, next: any)=>{
    const headers = req.headers;
    if (headers.token) {
        const checkToken = headers.token;
        if (token === checkToken) {
            next();
        }
        else{
            res.status(401).send("Authentication Failed!")
        }
    }
    else{
        res.status(401).send("Authentication Failed!")
    }
}
