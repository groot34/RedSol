import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please give a name"],
    },
    phone:{
        type:String,
        required:[true, "Please give a phone"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "Please give a email"],
        unique:true
    },
    hobby:{
        type:String,
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User