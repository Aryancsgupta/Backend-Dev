import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cookieParser("My-super-secret-key"));

// SET COOKIE
app.get('/set-cookie', (req, res) => {
    let user = {
        name: "Rohan",
        email: "rohan123@gmail.com"
    };

    const token = jwt.sign(user, "qwertyuiop", { expiresIn: '1h' });

    res.cookie('name', "Rohan", { httpOnly: true });
    res.cookie('token', token, { httpOnly: true });

    res.send("Cookie has been set");
});

// AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
    try {
        if (!req.cookies.token) {
            return res.send("Invalid user");
        }

        const token = req.cookies.token;
        const decoded = jwt.verify(token, "qwertyuiop");

        req.user = decoded;

        next();
    } catch (error) {
        return res.send("Invalid or expired token");
    }
};

// GET COOKIE
app.get('/get-cookie', authMiddleware, (req, res) => {
    res.send(`Cookie value: ${req.cookies.name}`);
});

// PROFILE
app.get('/profile', authMiddleware, (req, res) => {
    res.send(`Welcome to your profile, ${req.user.name}`);
});

// LOGOUT
app.get('/logout', (req, res) => {
    res.clearCookie('name');
    res.clearCookie('token');
    res.send("You have been logged out");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});