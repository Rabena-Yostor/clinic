const express = require('express')
const {
    createDoctor,
    getDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
    submitRequest,
    updateDoctorAffiliation,
    updateDoctorEmail,
    updateDoctorHourlyRate,
    addDoctor,
    filterAllApps,
    getPatientsForDoctor,
    addHealthRecord,
  viewHealthRecords,
  viewDoctorAccount,
  login,
  updateDoctorPassword,
  getWalletAmount,
  signUp,
  sendOtpAndSetPassword,
  logout

}= require('../controllers/doctorController')


const router = express.Router()

// get all doctors
router.get('/getAllDoctors', getDoctors)
// get a single Doctor
router.get('/getDoctor/:id', getDoctor)
// post a new Doctor
router.post('/createDoctor', createDoctor)
// delete a Doctor
router.delete('/deleteDoctor/:id', deleteDoctor)
// update a Doctor
router.patch('/updateDoctor/:id',updateDoctor)

//MALAK
router.post ('/submitRequest', submitRequest)
//KHALED
router.put('/updateDoctorEmail', updateDoctorEmail)
router.put('/updateDoctorHourlyRate', updateDoctorHourlyRate)   
router.put('/updateDoctorAffiliation', updateDoctorAffiliation)

router.post('/addDoctor', addDoctor)

router.get('/filterAllApps/doctor', filterAllApps)
router.get('/getPatientsForDoctor', getPatientsForDoctor)

router.post('/addHealthRecord/:username', addHealthRecord)
router.get('/viewHealthRecords/:username', viewHealthRecords)

router.get('/wallet-amount/:username', getWalletAmount);
router.post('/signup', signUp)

//login
router.post('/login', login)

//logout
router.get('/logout', logout)

//update password
router.post('/updateDoctorPassword', updateDoctorPassword)

//send otp and set password
router.post('/sendOtpAndSetPassword', sendOtpAndSetPassword)

module.exports = router 