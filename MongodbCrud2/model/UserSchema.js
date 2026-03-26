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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return ;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   
})
const user = mongoose.model("user", userSchema)
export default user;