"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todoList_1 = require("../json/todoList");
const auth_1 = require("../middleware/auth");
// Sending Entire JSON
router.get('/', auth_1.auth, (req, res) => {
    res.json(todoList_1.list);
    // res.send("I am rendering");
});
// Sending Req for single fetch
router.get('/:id', auth_1.auth, (req, res) => {
    const found = todoList_1.list.some(lists => lists.id === parseInt(req.params.id, 10));
    if (found) {
        res.json(todoList_1.list.filter(lists => lists.id === parseInt(req.params.id, 10)));
    }
    else {
        res.status(400).json({ msg: `No list with id ${req.params.id}` });
    }
});
// Adding a new member
router.post('/', auth_1.auth, (req, res) => {
    const newTodo = {
        id: req.body.id,
        todo: req.body.todo
    };
    if (!newTodo.id || !newTodo.todo) {
        res.status(400).json({ msg: 'Please include id & todo' });
    }
    todoList_1.list.push(newTodo);
    res.json({ msg: "Insertation Successfull!", addedTodo: newTodo });
    // res.redirect('/');
});
// Updating a Id
router.put('/:id', auth_1.auth, (req, res) => {
    const found = todoList_1.list.some(lists => lists.id === parseInt(req.params.id, 10));
    if (found) {
        const upMem = req.body;
        todoList_1.list.forEach(lists => {
            if (lists.id === parseInt(req.params.id, 10)) {
                lists.todo = upMem.todo ? upMem.todo : lists.todo;
                res.json({
                    msg: 'Updation Successfull',
                    list: todoList_1.list.filter((x) => {
                        return x.id === parseInt(req.params.id, 10);
                    })
                });
            }
        });
    }
    else {
        res.status(400).json({ msg: `No Todo with id ${req.params.id}` });
    }
});
// Deleting Todo
router.delete('/:id', auth_1.auth, (req, res) => {
    const found = todoList_1.list.some(lists => lists.id === parseInt(req.params.id, 10));
    if (found) {
        res.status(200).json({
            msg: "Todo Deleted",
            list: todoList_1.list.filter(lists => lists.id === parseInt(req.params.id, 10))
        });
    }
    else {
        res.status(400).json({ msg: `No Todo with id ${req.params.id}` });
    }
});
exports.default = router;
//# sourceMappingURL=todo.js.map