import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema  = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxLength:[25,"Name must contain 25 char only"]
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minLength:[6,"Password must contain 6 char only"]

    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})

const user = mongoose.model("user", userSchema)
export default user;