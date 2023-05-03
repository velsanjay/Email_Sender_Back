const mongoose = require('mongoose')

const newUserModel = mongoose.Schema({
    firstName:{
        type: String,
        require:true
    },
    lastName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
   
    createdAt : {
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type :Date,
        default :Date.now()
    }
})

module.exports = mongoose.model('newUser',newUserModel) 