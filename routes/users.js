const express = require('express');
const User = require('../models/user');
const router = express.Router();
const app = express();


//Getting all users (using async)
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // get all subscribers
        res.json(users);
    } catch (error) { // if try fails, send this error, which is likely to be a server-side error
        res.status(500).json({
            message: error.message
        })
    }

})
//Getting one user
router.get('/:id', (req, res) => {
    res.send(req.params.id);
})
//Creating user
router.post('/', async (req, res) => {

    const user = new User ({
        name: req.body.name,
        posts: req.body.posts,
        registerDate: req.body.registerDate

    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser) //201 indicates successful POST route

    } catch (error) { // if try fails, send error, likely to be issue with user input
        res.status(400).json({message: error.message});
    }
})
//Updating user - .patch: only update what the user passes, instead of put which updates ALL of the information of the subscriber instead of what is passed
router.patch('/', (req, res) => {

})

//Deleting user
router.delete('/:id', (req, res) => {

})

module.exports = router; 