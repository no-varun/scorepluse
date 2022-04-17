const express = require('express');
const app = express();
const db = require('./dbConectivity/config')
const userRouter = require('./router/routes');


app.use(express.json({ limit: "512mb" }));
app.use(express.urlencoded({ extended: true, limit: "512mb" }));



app.use('/user', userRouter);
app.listen('3000',(err,res)=>{
    if(err){
        console.log("not connected");
    }else{
        console.log("server connected on port 3000");
    }
})