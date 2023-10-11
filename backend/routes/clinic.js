const express = require('express');
const router = express.Router();

const appt1= require('../controllers/doctor');
const appt2= require('../controllers/patient');


router.get('/filter/doctor',doctor.filterAllApps);
router.get('/filter/patient',patient.filterAllApps);


module.exports= router;