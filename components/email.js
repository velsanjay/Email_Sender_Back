const EmailRouter = require('express').Router()
const newUserModel = require('../models/newUser.model')

EmailRouter.post('/email', async(req,res,next)=>{
    const {email}=req.body;
    const user = await newUserModel.findOne({email:email})

    if(user){
        res.status(200).json({
            success:true,
            messege:"Email Send Successfully!!!",
            data:user
        })
    }else{
        res.status(402).json({
            success:false,
            messege:"User Not Found"
        })
    }

})

module.exports = EmailRouter