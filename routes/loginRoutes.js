const express = require('express')
const router = express.Router()

const Login = require('./../models/Login')
const { jwtAuth, generateToken } = require('./../jwt_token')

//otp api
router.post('/', async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const login = new Login(data)
    const respons = await login.save()
    // const payLoad = {
    //   id: respons.id,
    //   mobileNo: data.mobileNo
    // }
    // const token = generateToken(payLoad)
    res.status(200).json({
      success: true,
      mag: 'OTP send Succeefully',
      data: {
        mobileNo: respons,
       
      }
    })
  } catch (error) {
    res.json({
      success: false,
      mag: 'OTP could not send',
      error: error.message
    })
  }
})

//profile api
router.get('/profile', jwtAuth, async (req, res) => {
  try {
    const userdata = req.user
    const userID = userdata.id
    const user=await Login.findById(userID);
    res.status(201).json({
      success:true,
      data: user
    })
  } catch (error) {
    res.json({
      success: false,
      mag: 'User not found',
      error: error.message
    })
  }
})

//get token api
router.post('/user', async (req, res) => {
  try {
    const { mobileNo } = req.body
    const user = await Login.findOne({ mobileNo: mobileNo })
    console.log(user)
    if (!user) {
      res.status(401).json({
        success: false,
        mgs: 'User not found'
      })
    } else {
      const payLoad = {
        id: user.id,
        mobileNo: mobileNo
      }
      const token = generateToken(payLoad)
      res.status(201).json({
        success: true,
        token: token
      })
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    })
  }
})

//get all data
router.get('/', jwtAuth, async (req, res) => {
  try {
    const data = await Login.find()
    res.status(200).json({
      success: true,
      data: data
    })
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    })
  }
})

//find user
router.get('/:mobileNo', async (req, res) => {
  try {
    const mobile = req.params.mobileNo
    console.log(mobile)
    const respons = await Login.find({ mobileNo: mobile })
    res.status(200).json({
      success: true,
      data: respons
    })
  } catch (error) {
    res.writeHead(500).json({
      success: false,
      error: error.message
    })
  }
})

//update data
router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatelogin = req.body
    const respons = await Login.findByIdAndUpdate(id, updatelogin, {
      new: true, //Return new update data
      runVlidator: true //Run validtor that define in login Schema
    })
    if (!respons) {
      res.status(404).json({
        success: false,
        msg: 'User not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Update Successful',
      data: respons
    })
  } catch (error) {
    res.json({
      success: false,
      mgs: 'Not updated',
      error: error.message
    })
  }
})

//Delete data
router.post('/logout/:id', async (req, res) => {
  try {
    const id = req.params.id
    const respons = await Login.findByIdAndDelete(id)
    if (!respons) {
      res.writeHead(404).json({
        success: false,
        mgs: 'User not found'
      })
    }
    res.status(200).json({
      success: true,
      mgs: 'Logout Successful'
    })
  } catch (error) {
    res.json({
      success: false,
      mgs: 'Not logout',
      error: error.message
    })
  }
})
//export  module
module.exports = router
