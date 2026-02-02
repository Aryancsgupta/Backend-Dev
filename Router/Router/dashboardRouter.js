import express from "express";
const router = express.Router();
const authMiddleware = (req, res, next) => {
  const { token } = req.query;

  if (token !== "admin123") {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  else{
    next();
  }

  
};
router.get('/profile',authMiddleware,(req,res)=>{


    res.send('Dashboard Page');
});

router.get('/report',(req,res)=>{
    res.send('Report Page');
}); 

export default router;