require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const doctorRoutes = require('./routes/doctors')


//express app
const app = express()

//middleware
app.use(express.json())

app.use((req ,res,next) =>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/doctors',doctorRoutes)

// connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        //listen for requests
app.listen(process.env.PORT, () =>
{console.log('connected to the db and listening on port',process.env.PORT) 
})
    })
    .catch((error) => {
        console.log(error)
    })

