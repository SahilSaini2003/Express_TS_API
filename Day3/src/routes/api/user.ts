import express, { Request, Response } from 'express';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';

const key = "Log@in";


const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "!@Qwerty12",
    database: "postgres"
})

client.connect();

const router = express.Router();

router.post('/',(req: Request, res: Response) => {
    client.query(`select * from "user" where "name" = '${req.headers.name}' and "pass" = '${req.headers.pass}'`, (error, result) => {
        if (!error) {
            if (result.rowCount === 0) {
                res.status(400).json({ msg: "User Not Present." })
            }
            else {
                jwt.sign({ result }, key, { expiresIn: '300s' }, (errorN, resultN) => {
                    res.status(201).json({ token: resultN, validity: '300s'})
                })
            }
        }
        else{
            res.status(400).json({error})
        }
    })
})

export default router;

