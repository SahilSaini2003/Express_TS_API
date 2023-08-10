import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const key = "Log@in";

export function auth(req: Request, res: Response, next: any){
    const rawToken :any = req.headers.token;
    if (rawToken) {
        const raw = rawToken.split(" ");
        const token = raw[1];
        jwt.verify(token, key, (error: any, result: any)=>{
            if (!error) {
                next();
            }
            else{
                res.status(400).json({msg : "Authenticaton Failed."})
            }
        })
    }
    else{
        res.status(400).json({msg : "Authenticaton Failed."})

    }
}