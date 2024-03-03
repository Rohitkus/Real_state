import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"


export const  signup =async (req,res)=>{
console.log(req.body)
// res.send("send successfully")
const {username,email,password}=req.body
const hashedpass =  bcryptjs.hashSync(password,10)
const newUser = new User ({username,email,password:hashedpass })
await newUser.save()
try{
res.status(201).json("user created successfully")
} catch(err){
    res.status(500).json(err.message)
}
}
