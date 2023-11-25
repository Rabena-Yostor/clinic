const express = require('express')
const router = express.Router()

const {
    viewRequests,
    approveRequests,
    rejectRequests,
    addAdmin,
    removeUser,
    viewPatientInfo,
    signUp,
    login,
    logout,
    updateAdminPassword,
    sendOtpAndSetPassword,
    createHealthPackage ,
    updateHealthPackage,
    deleteHealthPackage,
} = require('../controllers/adminController')



router.get('/viewRequests',viewRequests)

router.post('/approveRequests',approveRequests)

router.delete('/rejectRequests',rejectRequests)

router.post('/addAdmin', addAdmin)

router.delete('/removeUser',removeUser)

router.get('/viewPatientInfo',viewPatientInfo)

//sign up
router.post('/signup',signUp)

//login
router.post('/login',login)

//logout
router.get('/logout',logout)

//update password
router.post('/updateAdminPassword',updateAdminPassword)

//send otp and set password
router.post('/sendOtpAndSetPassword',sendOtpAndSetPassword)

router.post('/createHP',createHealthPackage)
router.put('/updateHP',updateHealthPackage)
router.delete('/deleteHP',deleteHealthPackage)

module.exports = router