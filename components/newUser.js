const { hashPassword } = require('../common/bcrypt');
const newUserModel = require('../models/newUser.model');

const newUserRoute = require('express').Router();

newUserRoute.post('/newuser', async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const user = await newUserModel.findOne({ email: email })
  if (!user) {
    const newUser = new newUserModel({
      firstName,
      lastName,
      email,
      password
    })
    if (newUser.password == confirmPassword) {

      let hashedPassword = await hashPassword(newUser.password)

      newUser.password = hashedPassword

      newUser.save().then((responce) => {
        if (responce && responce._id) {
          res.status(200).json({
            success: true,
            messege: 'User Created Succssfully!!!',
            data: responce
          })
        }

      }).catch((err) => {
        return res.status(402).json({
          success: false,
          messege: 'User Created Failed',
          error: err
        })
      })
    } else {
      return res.status(400).json({
        success: false,
        messege: 'Password are Not Same'
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      messege: 'User Already Exist'
    })
  }
})

module.exports = newUserRoute