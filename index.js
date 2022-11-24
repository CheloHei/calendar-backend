const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./database/config');

const app = express();


// Base de datos
dbConnection();

//cors
app.use(cors())

//dir public
app.use(express.static('public'));

//read and parse body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



//listen server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})