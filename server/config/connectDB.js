const mongoose=require('mongoose')
const dotenv=require('dotenv')

const connectDB=async()=>{
    dotenv.config();
    try{
        await mongoose.connect(process.env.MONGO_KEY)
        console.log("DB connected")
    }
    catch(error){
        console.log(error)
    }
}

module.exports=connectDB 