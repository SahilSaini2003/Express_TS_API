"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "!@Qwerty12",
    database: "postgres"
});
client.connect();
const router = express_1.default.Router();
// import { list } from '../json/todoList';
const auth_1 = require("../middleware/auth");
// Sending Entire JSON
router.get('/', auth_1.auth, (req, res) => {
    client.query(`select * from list`, (error, result) => {
        if (!error) {
            res.json(result.rows);
        }
        else {
            res.status(400).json({ msg: "Unable to fetch." });
        }
    });
});
// Sending Req for single fetch
router.get('/:id', auth_1.auth, (req, res) => {
    client.query(`select * from list where "id" = ${parseInt(req.params.id, 10)}`, (error, result) => {
        if (!error) {
            if (result.rowCount === 0) {
                res.status(400).json({ msg: "Id Not Present." });
            }
            else {
                res.json(result.rows);
            }
        }
        else {
            res.status(400).json({ msg: "Unable to fetch." });
        }
    });
});
// Adding a new member
router.post('/', auth_1.auth, (req, res) => {
    client.query(`insert into list values (${parseInt(req.body.id, 10)},'${req.body.todo}')`, (error, result) => {
        if (!error) {
            client.query(`select * from list where "id" = ${parseInt(req.body.id, 10)}`, (errorN, resultN) => {
                if (!errorN) {
                    res.json({
                        msg: "Inserton Successfull", result: resultN.rows
                    });
                }
                else {
                    res.status(400).json({ msg: "Unable to fetch.", errorN });
                }
            });
        }
        else {
            res.status(400).json({ msg: "Unable to Insert.", error });
        }
    });
});
// Updating a Id
router.put('/:id', auth_1.auth, (req, res) => {
    client.query(`update list set "todo" = '${req.body.todo}' where "id" = ${req.params.id}`, (error, result) => {
        if (!error) {
            client.query(`select * from list where "id" = ${parseInt(req.params.id, 10)}`, (errorN, resultN) => {
                if (!errorN) {
                    res.json({ msg: "Updation Successfull", result: resultN.rows });
                }
                else {
                    res.status(400).json({ msg: "Unable to fetch.", errorN });
                }
            });
        }
        else {
            res.status(400).json({ msg: "Unable to Update.", error });
        }
    });
});
// Deleting Todo
router.delete('/:id', auth_1.auth, (req, res) => {
    client.query(`select * from list where "id" = ${parseInt(req.params.id, 10)}`, (errorN, resultN) => {
        if (!errorN) {
            client.query(`delete from list where "id" = ${req.params.id}`, (error, result) => {
                if (!error) {
                    res.json({ msg: "Deletion Successfull", result: resultN.rows });
                }
                else {
                    res.status(400).json({ msg: "Unable to Delete.", error });
                }
            });
        }
        else {
            res.status(400).json({ msg: "Unable to fetch.", errorN });
        }
    });
});
exports.default = router;
//# sourceMappingURL=todo.js.map