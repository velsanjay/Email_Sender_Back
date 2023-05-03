const { hashPassword } = require('../common/bcrypt');
const newUserModel = require('../models/newUser.model');

const ForgetRouter = require('express').Router();

ForgetRouter.patch('/forget',async(req,res,next)=>{
    const {updatedAt, password}= req.body;

    // let user =null

    const user =await newUserModel.findOne({updatedAt:updatedAt})
    if(user==null){ 
     res.status(401).send({
        message:"Token Id Invalid"
     })
    }else{
         let hashedPassword = await hashPassword(password)
        user.password = hashedPassword;
        user. updatedAt = Date.now()
        user.save()
        res.status(200).json({
            success:true,
            message:"Password Updated Successfully!!!",
            data:user 
        })  
    }
})

module.exports = ForgetRouter