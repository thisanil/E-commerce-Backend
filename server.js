const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(express.json());
const axios = require('axios');

const loginRouter = require('./routes/loginRoutes');

app.use('/login',loginRouter);


app.listen(3000, () => {
  console.log('listen on 3000')
})
