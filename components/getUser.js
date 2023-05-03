const GetUserDetail = require('express').Router();
const newUserModel = require('../models/newUser.model')

GetUserDetail.get('/',async(req, res, next)=>{
    try {
        let user = await newUserModel.find({})
            res.status(200).json({
                success:true,
                data:user
            })
        
    } catch (error) {
        res.status(401).json({
            success:false,
            error:error,
            message:'No Data Found'
        })
    }
})

module.exports = GetUserDetail