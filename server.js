const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(express.json());

const loginRouter = require('./routes/loginRoutes');


app.use('/login',loginRouter);


app.listen('https://e-commerce-backend-5lun.onrender.com', () => {
  console.log('listen on 3000')
})
