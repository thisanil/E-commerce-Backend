const mongooes = require('mongoose');

const loginDetail=mongooes.Schema({
  mobileNo:{
    type:Number,
    required:true,
    
  },
});
const Login=mongooes.model('Login',loginDetail);
module.exports=Login;