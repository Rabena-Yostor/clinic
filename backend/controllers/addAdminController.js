const AddAdmin = require('../models/addAdmin')
const mongoose = require('mongoose')

//create a new admin
const createAdmin = async(req, res) => {
    const{AdminUserName,AdminPassword} = req.body
    try{
        const admin = await AddAdmin.create({AdminUserName,AdminPassword})
        res.status(200).json({admin})
    }catch(error){
        res.status(400).json({error: 'Admin could not be created'})

    }
}
//get all admins
const getAllAdmins = async(req, res) => {
    try{
        const admins = await AddAdmin.find()
        res.status(200).json({admins})
    }catch(error){
        res.status(400).json({message: 'cannot get all admins'})
    }
}

module.exports = {
    getAllAdmins,
    createAdmin
}