const express = require('express');
const router = express.Router();

const appt1= require('../controllers/doctor');
const appt2= require('../controllers/patient');
const show=require('../controllers/doctor');

 


router.get('/filter/doctor', appt1.filterAllApps);
router.get('/filter/patient', appt2.filterAllApps);
router.get('/get', show.getPatientsForDoctor);


router.post('/add-doctor', appt1.addDoctor);

module.exports= router;