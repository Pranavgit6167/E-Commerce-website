const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const Users= require("./db/Users");
require('./db/Users');
require('./db/config');


const app =express();
app.use(cors());
app.use(express.json());

app.post("/register",async(req,resp)=>{
    let user = new Users(req.body);
    let result = await user.save();
    result=result.toObject();
    delete result.password
    resp.send(result);
})

app.post("/login",async(req,resp)=>{
    
    if(req.body.password && req.body.email)
    {    
        let user = await Users.findOne(req.body).select("-password");
        if(user)
        {
            resp.send(user);
        }
        else{
            resp.send({result:"No user Found"});
        }
    }
    else{
        resp.send({result:"No user Found"});
    }
    
})

app.listen(5000);