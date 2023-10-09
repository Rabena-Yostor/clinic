require('dotenv').config()

const express = require('express')
const routers = require('./routes/routers.js')
const app = express()
const mongoose = require('mongoose')

//MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//ROUTES

app.use('/api/routers', routers)

//Connect to DB
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


