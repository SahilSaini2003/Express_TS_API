const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const auth = require('./auth');

const members = require('../../Members');

// Sending JSON
router.get('/', (req, res) => {
    res.json(members);
})

//Sending Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No Member with id ${req.params.id}` })
    }
})

// Create Member
router.post('/', auth, (req, res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        country: req.body.country
    }

    if (!newMember.name || !newMember.country) {
        res.status(400).json({ msg: 'Please include a name and country' });
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
})

// Updating Member
router.put('/:id', auth, (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const upMem = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = upMem.name ? upMem.name : member.name;
                member.country = upMem.country ? upMem.country : member.country;

                res.json({ msg: 'Member Found', member });
            }
        })
    }
    else {
        res.status(400).json({ msg: `No Member with id ${req.params.id}` })
    }
})

//Delete Member
router.delete('/:id', auth, (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: 'Member Deleted', 
        members: members.filter(member => member.id !== parseInt(req.params.id)) });
    }
    else {
        res.status(400).json({ msg: `No Member with id ${req.params.id}` })
    }
})

module.exports = router;