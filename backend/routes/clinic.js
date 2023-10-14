const express = require('express');
const router = express.Router();

const appt1= require('../controllers/doctor');
const appt2= require('../controllers/patient');
const show=require('../controllers/doctor');
const cr = require('../controllers/patient')
//const doctor= require('../models/doctormodel');
//const patient = require ('../models/patientmodel')

// //router.post('/api/doctors',async(req,res)=>{
//     try{
//         const{UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education,Appointment,Appointment_Status,ArrayOfPatients
//         }= req.body;
//         const newdoc=new doctor({UserName,Name,Email,Password,DateOfBirth,HourlyRate,AffiliatedHospital,Education,Appointment,Appointment_Status,ArrayOfPatients

            
//         });

//         const saveddoctor = await newdoc.save();
//         res.json(saveddoctor);
//     }catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       }

//     }
// );
// router.post('/api/patient',async(req,res)=>{
//     try{
//         const{username,name,email,password,dateOfBirth,gender,mobileNumber,EmergencyContactName,EmergencyContactNo,Appointment,Appointment_Status
//         }= req.body;
//         const newpat=new patient({username,name,email,password,dateOfBirth,gender,mobileNumber,EmergencyContactName,EmergencyContactNo,Appointment,Appointment_Status
//         });

//         const savedpatient = await newpat.save();
//         res.json(savedpatient);
//     }catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       }

//     }
// );

router.get('/filter/doctor', appt1.filterAllApps);
router.get('/filter/patient', appt2.filterAllApps);
router.get('/get', show.getPatientsForDoctor);
router.post('/create', cr.createPatient)

module.exports= router;