const mongoose = require('mongoose')
const Schema = mongoose.Schema

const followUpRequestSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        
    }
})
module.exports  = mongoose.model('followUpRequest', followUpRequestSchema)