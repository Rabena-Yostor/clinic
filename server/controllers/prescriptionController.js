const Prescription = require('../models/prescriptionsModel')
const mongoose = require('mongoose')

//get all perscriptions
const getPrescriptions = async (req, res) => {
    const prescriptions = await Prescription.find({}).sort({ createdAt: -1 })
    res.status(200).json(prescriptions)
}

// get single perscription
const getSinglePrescription = async (req, res) => {
    const { name } = req.body
    const prescription = await Prescription.findOne({name: name})
    if (!prescription) {
        return res.status(404).json({ error: "No such prescription (NAME)" })
    }
    res.status(200).json(prescription)
}

// create new perscription
const createPrescription = async (req, res) => {
    const { name, price, grams,date,doctor,filled } = req.body
    // add perscription to db
    try {
        const prescription = await Prescription.create({ name, price, grams,date,doctor,filled })
        res.status(200).json(prescription)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

//TEST PUSHH

//delete a perscription
const deletePrescription = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Prescription" })
    }

    const prescription = await Prescription.findOneAndDelete({ _id: id })

    if (!prescription) {
        return res.status(404).json({ error: "No such prescription" })
    }
    
    res.status(200).json(prescription)
}

//update a perscription

const updatePrescription = async(req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Prescription" })
    }

    const prescription = await Prescription.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!prescription) {
        return res.status(404).json({ error: "No such prescription" })
    }

    res.status(200).json(prescription)
}

// filter perscriptions based on date/doctor/filled/unfilled
const filterPrescriptions = async(req,res) => {
    try{
        const {date,doctor,filled} = req.body
        const filter = {}

        if (date) {
            // Use $or operator for logical OR condition
            filter.$or = [{ date: date }];
          }
          if (doctor) {
            // Use $or operator for logical OR condition
            filter.$or = filter.$or || [];
            filter.$or.push({ doctor: doctor });
          }
          if (filled !== undefined) {
            // Use $or operator for logical OR condition
            filter.$or = filter.$or || [];
            filter.$or.push({ filled: filled === true });
          }

        const prescriptions = await Prescription.find(filter)

        res.status(200).json(prescriptions)
    }
    catch(error){
        res.status(404).json({error: "Prescription not found!"})
    }
}
module.exports = {
     createPrescription,
     getSinglePrescription,
     getPrescriptions,
     deletePrescription,
     updatePrescription,
     filterPrescriptions
}
