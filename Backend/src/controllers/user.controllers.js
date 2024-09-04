// import httpStatus from "http-status";
// import {User} from "../models/user.model";
// import bcrypt ,{hash} from "bcrypt";
// import crypto from "crypto";
// const login = async(req,res)=>{
//     const {username,password}=req.body;
//     if(!username || !password){
//         return res.status(400).json({message:"please provide"})
//     }

//     try{
//         const user = await User.findOne({username});
//         if(!user){
//             return res.status(httpStatus.NOT_FOUND).json({message:"User Not Found"})
//         }
//         if(bcrypt.compare(password,user.password)){
//             let token = crypto.randomBytes(20).toString("hex");

//             user.token = token;
//             await User.save();
//             return res.status(httpStatus.OK).json({token:token})

//         }

//     }
//     catch(e){
//         return res.status(500).json({message: `Something went wrong ${e}`});

//     }
// }



// const register = async (req,res)=>{
//     const {name , username , password}= req.body;

//     try{
//        const existingUSer = await UserActivation.findOne({username});
//        if(existingUSer){
//         return res.status(httpStatus.FOUND).json({message:"User already exists"});

//        }
//        const hasedPassword = await bcrypt.hash(password,10);

//        const newUser = new User({
//             name:name,
//             username:username,
//             password:hasedPassword
//        });
//        await newUser.save();

//        res.status(httpStatus.CREATED).json({message:"User Registered"})
//     }catch(e){
//         res.json({message:`Something went wrong ${e}`})


//     }
// }

// export {login , register};

import httpStatus from "http-status";
import { User } from '../models/user.model.js';
import bcrypt from "bcrypt";
import crypto from "crypto";



const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide both username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid password" });
    }
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(httpStatus.CREATED).json({ message: "User registered" });
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

export { login, register };
