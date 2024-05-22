const express = require('express')
const router = express.Router()
// const db = require('./../db');
// app.use(express.json());
const Login = require('./../models/Login')
const {jwtAuth,generateToken}=require('./../jwt_token')
router.post('/', async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const login = new Login(data)
    const token =generateToken(data.mobileNo)
    const respons = await login.save()
    res.status(200).json({
      success: true,
      mag: 'OTP send Succeefully',
      data: {
        mobileNo: respons,
        token:token
      }
    })
  } catch (error) {
    res.json({
      success: false,
      mag: 'OTP could not send',
      error: error
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await Login.find()
    res.status(200).json({
      success: true,
      data: data
    })
  } catch (error) {
    res.json({
      success: false,
      error: error
    })
  }
})

router.get('/:mobileNo', async (req, res) => {
  try {
    const mobile = req.params.mobileNo
    console.log(mobile)
    // console.log(Login.find({ mobileNo: mobile }));
    const respons = await Login.find({ mobileNo: mobile })
    res.status(200).json({
      success: true,
      data: respons
    })
  } catch (error) {
    res.json({
      success: false,
      error: error
    })
  }
})

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
      msg: 'Update Successful',
      data: respons
    })
  } catch (error) {
    res.json({
      success: false,
      msg: 'Not updated',
      error: error
    })
  }
})
router.post('/logout/:id', async (req, res) => {
  try {
    const id = req.params.id
    const respons = await Login.findByIdAndDelete(id)
    if (!respons) {
      res.writeHead(404).json({
        success: false,
        msg: 'user not found'
      })
    }
    res.status(200).json({
      success: true,
      msg: 'Logout Successful',
    })
  } catch (error) {
    res.json({
      success: false,
      msg: 'Not logout',
      error: error.message
    })
  }
})
//export  module
module.exports = router
