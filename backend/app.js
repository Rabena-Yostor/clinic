const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()



app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

  app.use('/api/workouts', workoutRoutes)