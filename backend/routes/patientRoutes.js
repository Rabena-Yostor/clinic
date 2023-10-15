const express = require('express')
const router = express.Router()


const {
    registerPatient,
    loginPatient,

} = require('../controllers/patientController')




router.post ('/', registerPatient)

router.post('/login',loginPatient)

module.exports = router