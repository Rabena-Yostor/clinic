// External variables
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const regPatient =require('./routes/patientRoutes')
const loginPatient = require('./routes/patientRoutes')
const submitRequest=require('./routes/doctorRoutes')
const viewRequests=require('./routes/adminRoutes')
const approveRequests=require('./routes/adminRoutes')
const rejectRequests=require('./routes/adminRoutes')
const addAdmin =require('./routes/adminRoutes')
const removeUser =require('./routes/adminRoutes')
const viewPatientInfo =require('./routes/adminRoutes')
const MongoURI = process.env.MONGO_URI ;

// Require the package & envoke the config method on it 
const dotenv =require('dotenv').config()



// Express app running in the backend 
// App variables 
 const cors = require('cors');
 const app = express()
 const port = process.env.PORT || "4000";

// Middleware
 app.use(express.json())

 app.use(cors());

 app.use((req , res , next,) => {
     console.log(req.path, req.method)
     next()
})



// Routes 
app.use ('/api/workouts', workoutRoutes)
app.use ('/api/patients', regPatient)
app.use ('/api/patients', loginPatient)
app.use ('/api/patients', submitRequest)
app.use ('/api/patients', viewRequests)
app.use ('/api/patients', approveRequests)
app.use ('/api/patients', rejectRequests)
app.use ('/api/patients', addAdmin )
app.use ('/api/patients', removeUser)
app.use ('/api/patients', viewPatientInfo)



// Connect to db 
mongoose.connect(process.env.MONGO_URI )
.then(() => {
      console.log("MongoDB is now connected!")
      
    // Express listening for requests
    app.listen(process.env.PORT, () => { 
      console.log('listening on port', process.env.PORT)
   })

})
.catch((error) => {
    console.log(error)
})

