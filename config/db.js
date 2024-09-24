const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch((error) => {
        console.error('Connection failed!', error);
    });
