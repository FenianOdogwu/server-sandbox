const express = require('express');
const router = express.Router();
const app = express();

//Getting all users
router.get('/', (req, res) => {
    res.send('Hello User')
})
//Getting one user
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})
//Creating user
router.post('/', (req, res) => {

})
//Updating user - only update what the user passes, instead of put which updates ALL of the information of the subscriber instead of what is passed
router.patch('/', (req, res) => {

})

//Deleting user
router.delete('/:id', (req, res) => {

})

module.exports = router;