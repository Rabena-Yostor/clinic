// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const {updateDoctorAffiliation,updateDoctorEmail,updateDoctorHourlyRate, createDoctor, getDoctors, getDoctor} = require("./Routes/doctorController");
const MongoURI = process.env.MONGO_URI ;
const cors = require('cors');



//App variables
const app = express();
const port = process.env.PORT || "4000";
const doctor = require('./Schemas/doctor');
// #Importing the userController
app.use(cors());
// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/", (req, res) => {
    res.status(200).send("welcome to the clinic API!");
  });

// #Routing to userController here

// app.use(express.json())
// app.post("/addUser",createUser);
// app.get("/users", getUsers);
// app.put("/updateUser", updateUser);
// app.delete("/deleteUser", deleteUser);
app.use(express.json())
app.get("/getDoctors", getDoctors);
app.get("/getDoctor", getDoctor);
app.post("/createDoctor", createDoctor);
app.put("/updateDoctorEmail", updateDoctorEmail);
app.put("/updateDoctorHourlyRate", updateDoctorHourlyRate);
app.put("/updateDoctorAffiliation", updateDoctorAffiliation);


