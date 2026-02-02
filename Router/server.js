import express from 'express';
import userRouter from './Router/userRouter.js';
import registerRouter from './Router/registerRouter.js';
import dashboardRouter from './Router/dashboardRouter.js';
const app = express();
const port = 3000;


app.use('/api',userRouter);
app.use('/auth',registerRouter);
app.use('/dashboard',dashboardRouter);

app.listen(port,()=>{
    console.log("server is running on port"+ port)
})
