// initialize the mongoose package
const mongoose = require('mongoose');
require('dotenv').config()

//this is url to connect to the database
const mongoURL = process.env.DB_URL;

// connect to the database
mongoose.connect(mongoURL)


// get default connection
const db = mongoose.connection;

db.on('connected', () => { 
    console.log('connected to MongoDB server'); 
})

db.on('error', (err) => {
    console.error('Error connecting to MongoDB server: ', err);
})

db.on('disconnected', () => {
    console.log('disconnected from MongoDB server');
})


// export the database connection
module.exports = db;