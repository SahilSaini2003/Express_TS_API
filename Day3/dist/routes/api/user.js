"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = "Log@in";
const client = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "!@Qwerty12",
    database: "postgres"
});
client.connect();
const router = express_1.default.Router();
router.post('/', (req, res) => {
    client.query(`select * from "user" where "name" = '${req.headers.name}' and "pass" = '${req.headers.pass}'`, (error, result) => {
        if (!error) {
            if (result.rowCount === 0) {
                res.status(400).json({ msg: "User Not Present." });
            }
            else {
                jsonwebtoken_1.default.sign({ result }, key, { expiresIn: '300s' }, (errorN, resultN) => {
                    res.status(201).json({ token: resultN, validity: '300s' });
                });
            }
        }
        else {
            res.status(400).json({ error });
        }
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map