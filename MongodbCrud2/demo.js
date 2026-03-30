import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app = express();
app.use(cookieParser("My-super-secret-key"));

app.get('/set-cookie', (req, res) => {
    const user = {
        name : "Rohan",
        email : "rohan123@gmail.com"
    };
    const token = jwt.sign(user, "qwertyuiop", { expiresIn: '1h' });
    console.log(token);
    res.cookie('token', token, { httpOnly: true });
    res.send("Cookie has been set");
});
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("invalid user");
    }
    next();
}

app.get('/get-cookie', authMiddleware, (req, res) => {
    try {
        const decoded = jwt.verify(req.cookies.token, "qwertyuiop");
        res.send(`Cookie user: ${decoded.name}`);
    } catch (err) {
        return res.status(401).send('invalid token');
    }
});

app.get('/profile', authMiddleware, (req, res) => {
      
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "qwertyuiop");
    console.log(decoded);
    res.send(`Welcome to your profile, ${decoded.name}`);
}); 


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send("You have been logged out");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});