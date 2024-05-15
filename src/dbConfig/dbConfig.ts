import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("MongoDB connected")
        })

        connection.on('error', (err)=>{
            console.log('MongoDB connection error, make sure the DB is up and running')
            process.exit();
        })
     
    }catch(error){
        console.log('SomeThing went Wrong in connecting DB')
        console.log(error)
    }
}