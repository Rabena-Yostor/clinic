const mongoose= require ('mongoose')

const Schema = mongoose.Schema

const workSchema= new Schema({
    Name: {
        type: String,
        required: true
    },
    National_id:{
        type: Number,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    relation:{
        type: String,
        required: true
        enum: ['WIFE', 'HUSBAND', 'CHILDREN']
    }
    patient:(
        type: mongoose.Schema.Types.ObjectId,
         ref:'patient',
    )




}, { timestamps: true})

module.exports= mongoose.model('work', workSchema)

//work.find()