const express = require('express'); // get express package
const app = express(); // creates app var for the server that allows us to configure server
const mongoose = require ('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) 
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Middleware
app.use(express.json())

//ROUTES
app.get('/', (req, res) => {
    res.send('Home');
})


const usersRouter = require('./routes/users');
app.use('/users' , usersRouter) // url will use 'localhost:3000/users/'


app.listen(3000, () => console.log('Server Started'));