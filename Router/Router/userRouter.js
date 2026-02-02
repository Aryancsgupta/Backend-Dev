import express from "express";

const router = express.Router();

let logging = (req,res,next)=>{
    console.log("User Router is accessed at "+ new Date());
    console.log("Request Method: "+ req.method);
    console.log("Request URL: "+ req.url);
    next();
}

router.use(logging);
router.get('/',(req,res)=>{
    res.send('User Home Page');
});

router.get('/user',(req,res)=>{
    res.send('user route ')
});

export default router;