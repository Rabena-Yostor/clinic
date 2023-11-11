const express = require('express')
const router = express.Router()

const {
    viewRequests,
    approveRequests,
    rejectRequests,
    addAdmin,
    removeUser,
    viewPatientInfo,
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

router.post('/createHP',createHealthPackage)
router.put('/updateHP',updateHealthPackage)
router.delete('/deleteHP',deleteHealthPackage)



module.exports = router