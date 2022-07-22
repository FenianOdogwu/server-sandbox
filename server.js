const express = require('express'); // get express package
const app = express(); // creates app var for the server that allows us to configure server
const mongoose = require ('mongoose');
require('dotenv').config();
var fs = require('fs')

app.set('view engine', 'ejs'); // view engine to allow us to render html


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) 
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use('/', (req, res) => {
  res.render('index')
})



//Middleware
app.use(express.json())



const usersRouter = require('./routes/users');
app.use('/users' , usersRouter) // url will use 'localhost:3000/users/'


app.listen(3000, () => console.log('Server Started'));