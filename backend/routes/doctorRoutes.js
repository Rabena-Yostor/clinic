const express = require('express')
const router = express.Router()

const {
    submitRequest,
    
    
} = require('../controllers/doctorController')




router.post ('/submit', submitRequest)





module.exports = router