const express = require('express'); // get express package
const app = express(); // creates app var for the server that allows us to configure server
const mongoose = require ('mongoose');


mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true}) 
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(3000, () => console.log('Server Started'));