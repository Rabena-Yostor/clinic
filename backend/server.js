require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const patientroutes = require('./routes/patient')
const app = express();
const doctorRoutes = require('./routes/doctors')
const adminRoutes = require('./routes/adminRoutes')
const prescriptionRoutes = require('./routes/prescriptionRoutes')

const cors = require('cors');
// Allow requests from all origins with the specified headers and methods
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));
  app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use(express.json())

app.use('/api/patient',patientroutes)
app.use('/api/doctors',doctorRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/prescription',prescriptionRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>{
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


