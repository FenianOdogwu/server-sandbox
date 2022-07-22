const mongoose = require('mongoose'); //create model to interact with database


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    posts: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema) // export this model function to interact with the databse, using this schema