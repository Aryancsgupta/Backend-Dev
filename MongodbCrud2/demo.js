import express from 'express';
import cookiesPraser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app = express();
app.use(cookiesPraser("My-super-secret-key"));

app.get('/set-cookie', (req, res) => {
    let user = {
        name : "Rohan",
        email : "rohan123@gmail.com"
    }
    const token = jwt.sign(user,"qwertyuiop,{expiresIn:'1h'}");
    console.log(token);
    res.cookie('name',"Rohan", {httpOnly:true});
    res.send("Cookie has been set");
});
const authMiddleware = (req, res, next) => {
    if (!req.cookies.name) {
        return res.send("invalid user");
    }   
    next();
}

app.get('/get-cookie',authMiddleware, (req, res) => {
   
    const name = req.cookies.name;
    res.send(`Cookie value: ${name}`);
});

app.get('/profile', authMiddleware, (req, res) => {
      
    const name = req.cookies.name;
    res.send(`Welcome to your profile, ${name}`);
}); 


app.get('/logout', (req, res) => {
    res.clearCookie('name');
    res.send("You have been logged out");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});