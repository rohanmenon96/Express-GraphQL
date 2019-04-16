//Packages Imported
const express = require('express')


const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log("App is listening at port ",port)
})

app.get("/",async(req,res)=>{
    res.send("Hello!");
})