import { errorhandler } from "../Utils/error.js";
import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  console.log(req.body);

  // res.send("send successfully")
  const { username, email, password } = req.body;
  const hashedpass = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpass });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// sign in function////////////////////

export const signin = async (req, res, next) => {
    console.log(req.body)
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email });
    console.log(validuser)
    if (!validuser) return next(errorhandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validuser.password);
    if (!validPassword) return next(errorhandler(401, "Invalid Password!"));
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const {password:pass,...rest}=validuser._doc
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

// google sign in backend part

 export const google = async (req,res,next)=>{
  
  try{
       const user = await User.findOne({email: req.body.email})
         
       if(user){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass , ...rest}=user._doc
        res
           .cookie('access_token',token,{httpOnly:true})
          .status(200) 
          .json(rest);
       } 
       else{
        const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
        const hasPassword=bcryptjs.hashSync(generatePassword,10)
        const newUser= new User({username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-3),
          email:req.body.email,
          password:hasPassword,
          avatar:req.body.photo,
        });
        await newUser.save()
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        const {password:pass , ...rest}=newUser._doc
        res
           .cookie('access_token',token,{httpOnly:true})
          .status(200) 
          .json(rest);
       }
          
  }catch(error){
    next(error)
  }

 }