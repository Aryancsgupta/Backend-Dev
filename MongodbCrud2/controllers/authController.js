import User from '../model/UserSchema.js';
import bcrypt from 'bcryptjs';

export const signup = async(req, res) => {
   try {
    const { name, email, password } = req.body; 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(200).json({
        message:"User is created",
        newUser
    })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error: error.message
        })
    }   

}