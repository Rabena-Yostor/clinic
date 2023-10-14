const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const app = express();
const MongoURI = process.env.MONGO_URI ;
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// connect to db
mongoose.connect("mongodb+srv://hanakandil1610:kny0NMgtqHuDKUc7@cluster0.7kow66n.mongodb.net/")
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(4000, () => {
      console.log('listening for requests on port 9000')
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
const appointement = require('./routes/clinic');


app.use(bodyParser.json());



app.use('/appt', appointement);

