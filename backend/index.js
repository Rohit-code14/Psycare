const express = require("express");
const app = express();
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const morgan = require("morgan")
require("dotenv").config();
const cors = require("cors")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./models/user")

mongoose.connect(process.env.MONGODB,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to DB Successfully");
}).catch((err)=>{
    console.log(error);
})
app.use(morgan("tiny"))
app.use(cookieparser())
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieparser())

app.get('/', (req,res) => {
    res.status(200).send("Home Page");
})

app.post("/api/register", async(req,res) => {
    try {
        const {name, email, password} = req.body;
        console.log(name,email,password);
        if(!(email && password && name)){
            return res.status(400).json({err:"Please fill all the fields"})
        }
        const existing = await User.findOne({email})
        if(existing){
            console.log("exist");
            return res.status(401).json({err:"Already registered"})
        }
        const encryPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email:email.toLowerCase(),
            password:encryPassword
        })
        console.log("Register :",user);
        const token = jwt.sign(
            {user_id : user._id,email},
            process.env.SECRET,
            {
                expiresIn: "30d"
            }
        )
        user.token = token
        // user.save()
        user.password = undefined
        return res.status(201).json({
            user,
            token
        })
    } catch (error) {
        // console.log(error)
    }
})

app.post("/api/login", async (req,res) =>{
    try {
        const {email, password} = req.body
        if(!(email && password)){
            return res.status(400).json({err:"Fill all the fields"})
        }
        const user = await User.findOne({email})
        if(user == null){
            return res.status(400).json({err:"Account does not exist"})
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                {user_id : user._id,email},
                process.env.SECRET,
                {
                    expiresIn: "30d"
                }
            )
            user.password = undefined
            const options = {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            return res.status(200).cookie("token",token,options).json({user,token})
        }
        else{
            console.log("Not matching");
            return res.status(404).json({err:"Not matching"})
        }
        res.status(500).send("Email Password not matching")

    } catch (error) {
        // console.log(error);
    }
})

app.post("/api/verify",  async (req,res,next) =>{
    const token = req.body.token || req.cookies.token || req.header("Authorization").replace('Bearer ','')
    console.log(token);
    if(!token){
        return false
    }

    const decode = jwt.verify(token, process.env.SECRET)
    console.log("decode",decode);
    const user = await User.findById(decode.user_id)
    console.log("user",user);
    if(user){
        user.password = undefined
        // next();
        return res.status(200).json({user})
    }
    return res.status(400).json({err:"Unauthorized"})

        
})
const isLoggedIn =   async (req,res,next) =>{

    // if(req.cookie.token){
    //     const token = req.cookie.token
    // }
    const token = req.body.token
    console.log("token at isLoggedin : ",token);
    // const token = req.body.token || req.cookies.token ||  req.header("Authorization").replace('Bearer ','')

    if(!token){
        return false
    }

    const decode = jwt.verify(token, process.env.SECRET)
    console.log("isLogged in : ",decode);

    const user = await User.findById(decode.user_id)
    console.log("islogged in user: ",user);
    if(user){
        req.user = user
        next();
        return user
    }
    return false

        
}
app.get("/api/logout",isLoggedIn,(req,res,next) =>{
    res.status(200).cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    }).json({
        "success":"true",
        "message":"Logout Successfull"
    })
})

app.post("/api/score",isLoggedIn,async(req,res,next)=>{
    const userins = await User.findOne({email:req.user.email})
    console.log("User in score : ",userins);
    if(userins){
        userins.health.score = req.body.mark;
        userins.save()
        console.log("Updated user: ",userins);
        return res.status(200).json({
            message:"Score updated",
            success:true
        })
    }
    return res.status(400).json({err:"Error in updaating score ...try again"})
})

app.get("/api/user/:token",async(req,res,next) => {
    const token = req.params.token
    if(!token){
        return res.status(400).json({
            err:"Token not received"
        })
    }
    const decode = jwt.verify(token, process.env.SECRET)
    console.log("isLogged in : ",decode);

    const user = await User.findById(decode.user_id)
    user.password = undefined
    console.log("islogged in user: ",user);
    if(!user){
        return res.status(400).json({
            err:"Invalid token"
        })
    }
    console.log("final return : ",user);
    return res.status(200).json({user})
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening at ",process.env.PORT);
})
