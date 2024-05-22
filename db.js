const mongoose = require('mongoose');
// const mongooseURL="mongodb://localhost:27017/E-commerce";
const mongooseURL="mongodb+srv://an011saini:Anil123@cluster0.2xmttot.mongodb.net";
mongoose.connect(mongooseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Contected to MongoDB Server");
});

db.on('disconnected',()=>{
    console.log("Discontected to MongoDB Server");
});
module.exports=db;