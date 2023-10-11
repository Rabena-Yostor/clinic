const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const app = express();
const MongoURI = process.env.MONGO_URI ;
const PORT = process.env.PORT || 8000;

// connect to db
mongoose.connect("mongodb+srv://khaled:ACLproj@mernapp.xnikpnh.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(9000, () => {
      console.log('listening for requests on port 9000')
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
const appointement = require('./routes/clinic');

app.use('/appt', appointement);