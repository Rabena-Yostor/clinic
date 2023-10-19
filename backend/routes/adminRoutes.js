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



router.get('/viewRequests',viewRequests)

router.post('/approveRequests/:id',approveRequests)

router.delete('/rejectRequests/:id',rejectRequests)

router.post('/addAdmin', addAdmin)

router.delete('/removeUser',removeUser)

router.get('/viewPatientInfo',viewPatientInfo)



module.exports = router