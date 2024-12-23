const mongoose = require("mongoose");

const connectDB = async(req,res)=>{

    mongoose.connection.on('connected',()=>{
        console.log('connected to database')
    })
    await mongoose.connect(process.env.MONGODB_URI);
}
module.exports = connectDB;