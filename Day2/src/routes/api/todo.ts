import express, { Request, Response } from 'express';

const router = express.Router();

import { list } from '../json/todoList';
import { auth } from '../middleware/auth';

// Sending Entire JSON
router.get('/', auth, (req: Request, res: Response) => {
    res.json(list);
    // res.send("I am rendering");
})

// Sending Req for single fetch
router.get('/:id', auth, (req: Request, res: Response) => {
    const found = list.some(lists => lists.id === parseInt(req.params.id, 10));
    if (found) {
        res.json(list.filter(lists => lists.id === parseInt(req.params.id, 10)));
    }
    else {
        res.status(400).json({ msg: `No list with id ${req.params.id}` })
    }

})

// Adding a new member
router.post('/', auth, (req: Request, res: Response) => {
    const newTodo = {
        id: req.body.id,
        todo: req.body.todo
    }

    if (!newTodo.id || !newTodo.todo) {
        res.status(400).json({ msg: 'Please include id & todo' })
    }

    list.push(newTodo);
    res.json({msg: "Insertation Successfull!",addedTodo:newTodo});
    // res.redirect('/');

})

// Updating a Id
router.put('/:id', auth, (req: Request, res: Response) => {
    const found = list.some(lists => lists.id === parseInt(req.params.id, 10));
    if (found) {
        const upMem = req.body;
        list.forEach(lists => {
            if (lists.id === parseInt(req.params.id, 10)) {
                lists.todo = upMem.todo ? upMem.todo : lists.todo;

                res.json({
                    msg: 'Updation Successfull',
                    list: list.filter((x) => {
                        return x.id === parseInt(req.params.id, 10);
                    }) });
            }
        })
    }
    else {
        res.status(400).json({ msg: `No Todo with id ${req.params.id}` })
    }

})

// Deleting Todo
router.delete('/:id', auth, (req: Request, res: Response) => {
    const found = list.some(lists => lists.id === parseInt(req.params.id, 10));
    if (found) {
        res.status(200).json({
            msg: "Todo Deleted",
            list: list.filter(lists => lists.id === parseInt(req.params.id, 10))
        });
    }
    else {
        res.status(400).json({ msg: `No Todo with id ${req.params.id}` })
    }

})

export default router;