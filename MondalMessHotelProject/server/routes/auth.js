import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {protect} from "../middleware/auth.js";
const router=Router();
const tokenFor=(user)=>jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"7d"});
router.post("/register",async(req,res,next)=>{try{
 const {name,mobile,password,roomNumber}=req.body;
 if(!name||!mobile||!password) return res.status(400).json({message:"Name, mobile and password are required"});
 if(!/^\d{10}$/.test(String(mobile))) return res.status(400).json({message:"Enter a valid 10-digit mobile number"});
 if(String(password).length<8) return res.status(400).json({message:"Password must be at least 8 characters"});
 if(await User.findOne({mobile})) return res.status(409).json({message:"Mobile number already registered"});
 const user=await User.create({name,mobile:String(mobile),password:await bcrypt.hash(password,12),roomNumber,role:"user"});
 res.status(201).json({token:tokenFor(user),user:{id:user._id,name:user.name,mobile:user.mobile,role:user.role}});
}catch(e){next(e)}});
router.post("/login",async(req,res,next)=>{try{
 const {mobile,password}=req.body; const user=await User.findOne({mobile:String(mobile)}).select("+password");
 if(!user||!(await bcrypt.compare(password||"",user.password))) return res.status(401).json({message:"Invalid mobile or password"});
 if(user.accountStatus!=="active") return res.status(403).json({message:"Account is not active"});
 res.json({token:tokenFor(user),user:{id:user._id,name:user.name,mobile:user.mobile,role:user.role}});
}catch(e){next(e)}});
router.get("/me",protect,(req,res)=>res.json({user:{id:req.user._id,name:req.user.name,mobile:req.user.mobile,role:req.user.role,roomNumber:req.user.roomNumber}}));
export default router;
