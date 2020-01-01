const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config({ path: './config/config.env'});

//connect to db
connectDB();

const app = express();

//body parser middleware
app.use(express.json());

//enable cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))