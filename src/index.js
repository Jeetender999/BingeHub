import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './App.js';


dotenv.config({
    path : './env'
})



connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server started at ", process.env.PORT)
   })
})
.catch((err)=>{
    console.log("Mongo DB connection failed : ",err)
})

// import express from 'express'

// const app = express()

// (async()=>{
//  try{
//    await mongoose.connect(`${process.env.MONGODB_URI}/BingeHub`)

//    app.on("Error",(error)=>{
//        console.log("Error",error)
//        throw error
//    })

//    app.listen(process.env.PORT,()=>{
//     console.log("Connected to port ", process.env.PORT)
//    })


//  }catch(error)
//  {
//     console.error("ERROR",error)
//     throw error
//  }
// })()