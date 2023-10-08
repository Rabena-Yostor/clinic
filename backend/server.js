require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutsRoutes = require('./routes/workouts');


// express app
const app = express();

// middleware & static files
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);  
    next()

})

//routes
app.use('/api/workouts', workoutsRoutes);

// connect to mongodb & listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT)
        })

    })
    
    .catch(err => console.log(err));