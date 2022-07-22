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
router.get('/:id',  getUser, (req, res) => {
    res.json(res.user);
})


//Creating user
router.post('/', async (req, res) => {
    const user = new User ({
        name: req.body.name,
        posts: req.body.posts,
        registerDate: req.body.registerDate
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser) //201 indicates successful POST route

    } catch (error) { // if try fails, send error, likely to be issue with user input
        res.status(400).json({message: error.message});
    }
})
//Updating user - .patch: only update what the user passes, instead of put which updates ALL of the information of the subscriber instead of what is passed
router.patch('/:id',  getUser, async (req, res) => {

    if(req.body.name != null) { // if request name of user is passed, set it = to the request
        res.user.name = req.body.name;
    }
    if(req.body.posts != null) {
        res.user.posts = req.body.posts;
    }
    try {
        const updatedPostCount = await res.user.save();
        res.json(updatedPostCount)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

//Deleting user
router.delete('/:id',  getUser, async (req, res) => {
   try {
        await res.user.remove();
        res.json({message: `Deleted user: ${res.user.name} \n ID: ${res.user.id}`})
   } catch (error) {
    res.status(500).json({message: error.message})
   }
})



//MIDDLEWARE
async function getUser(req, res, next) { //Getting a user
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) { //if the user does not exist, return a 404 
            return res.status(404).json({message: 'Cannot find user'});
        }
    } catch (error) { //may be something wrong with our server that causes problem
        return res.status(500).json({message: error.message})
    }


    /* assign the variable "user" to the response object of user, 
    we can apply this to other routes
    */
    res.user = user;
    next(); 
}

module.exports = router; 