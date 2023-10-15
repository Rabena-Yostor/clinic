const express = require('express')
const router = express.Router()

const {
    viewRequests,
    approveRequests,
    rejectRequests,
    addAdmin,
    removeUser,
    viewPatientInfo,

} = require('../controllers/adminController')



router.get('/all',viewRequests)

router.post('/approverequest/:id',approveRequests)

router.delete('/rejectrequest/:id',rejectRequests)

router.post('/addadmin', addAdmin)

router.delete('/remove',removeUser)

router.get('/patientinfo',viewPatientInfo)



module.exports = router