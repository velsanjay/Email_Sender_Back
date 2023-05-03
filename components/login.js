const { hashCompare } = require('../common/bcrypt');
const newUserModel = require('../models/newUser.model');

const loginRoute=require('express').Router();

loginRoute.post('/login', async(req, res, next)=>{
    const{ email, password } = req.body;

    const user =await newUserModel.findOne({email:email}) 
    // const user = await user1.json()
    
    if(user){
        if( await hashCompare(password,user.password)){
            res.status(200).json({
                message:"Login Successfully!!!",
                data: user
            })
        }else{
            res.status(402).json({
                message:"Incorrect Password"
            })
        } 
       
        
    }else{
        res.status(402).json({
        message:"User Not Found"
       })
    }
})

module.exports = loginRoute;