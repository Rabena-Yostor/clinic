const express = require('express');
const router = express.Router();

const appt1= require('../controllers/doctor');
const appt2= require('../controllers/patient');


router.get('/filter/doctor', appt1.filterAllApps);
router.get('/filter/patient', appt2.filterAllApps);


module.exports= router;