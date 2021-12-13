const express = require("express");
const app = express();
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
require("dotenv").config();

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())

app.get('/', (req,res) => {
    res.status(200).send("Home Page");
})

app.post("/api/register", async(req,res) => {
    try {
        const {name, email, password} = req.body;
        console.log(name,email,password);
        if(!(email && password && name)){
            res.status(400).send("Please fill all the fields")
        }
        const existing = await User.findOne({email})
        if(existing){
            console.log("exist");
            res.status(401).send("Already registered")
        }
        const encryPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email:email.toLowerCase(),
            password:encryPassword
        })
        const token = jwt.sign(
            {user_id : user._id,email},
            process.env.SECRET,
            {
                expiresIn: "5h"
            }
        )
        user.token = token
        user.save()
        // user.password = undefined
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/login", async (req,res) =>{
    try {
        const {email, password} = req.body
        if(!(email && password)){
            res.status(400).send("Fill all the fields")
        }
        const user = await User.findOne({email})
        if(user == null){
            res.status(400).send("Account does not exist")
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                {user_id : user._id,email},
                process.env.SECRET,
                {
                    expiresIn: "5h"
                }
            )
            user.token = token
            user.save()
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.status(200).cookie("token",token,options).send(token)
        }
        else{
            console.log("Not matching");
            res.status(404).send("Not matching")
        }
        res.status(500).send("Email Password not matching")

    } catch (error) {
        // console.log(error);
    }
})


app.listen(process.env.PORT, () => {
    console.log("Listening at ",process.env.PORT);
})