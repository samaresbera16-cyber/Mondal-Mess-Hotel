import {Router} from "express";
import MealType from "../models/MealType.js";
import MealRecord from "../models/MealRecord.js";
import User from "../models/User.js";
import {protect,adminOnly} from "../middleware/auth.js";
const router=Router(); router.use(protect);
router.get("/types",async(req,res,next)=>{try{res.json(await MealType.find({isActive:true}).sort({name:1}))}catch(e){next(e)}});
router.get("/",async(req,res,next)=>{try{
 const userId=req.user.role==="admin"&&req.query.userId?req.query.userId:req.user._id;
 const filter={userId}; if(req.query.month){const [y,m]=req.query.month.split("-").map(Number);filter.mealDate={$gte:new Date(y,m-1,1),$lt:new Date(y,m,1)}}
 res.json(await MealRecord.find(filter).populate("mealTypeId","name currentPrice").sort({mealDate:-1}).limit(500));
}catch(e){next(e)}});
router.post("/",async(req,res,next)=>{try{
 const {userId:requested,mealTypeId,mealDate,status="served"}=req.body;
 const userId=req.user.role==="admin"&&requested?requested:req.user._id;
 const user=await User.findById(userId); if(!user||user.accountStatus!=="active")return res.status(400).json({message:"Active user not found"});
 const type=await MealType.findById(mealTypeId);if(!type||!type.isActive)return res.status(400).json({message:"Active meal type required"});
 const date=new Date(mealDate);if(Number.isNaN(date.getTime()))return res.status(400).json({message:"Invalid meal date"});
 date.setHours(12,0,0,0);
 const record=await MealRecord.create({userId,mealTypeId,mealNameSnapshot:type.name,mealPriceSnapshot:type.currentPrice,mealDate:date,status,createdBy:req.user._id,updatedBy:req.user._id});
 res.status(201).json(record);
}catch(e){if(e.code===11000)return res.status(409).json({message:"This meal is already recorded for this user and date"});next(e)}});
router.delete("/:id",async(req,res,next)=>{try{
 const record=await MealRecord.findById(req.params.id);if(!record)return res.status(404).json({message:"Meal not found"});
 if(req.user.role!=="admin"&&String(record.userId)!==String(req.user._id))return res.status(403).json({message:"Not allowed"});
 if(req.user.role!=="admin")return res.status(403).json({message:"Only admin can remove meal records"});
 record.status="cancelled";record.updatedBy=req.user._id;await record.save();res.json({message:"Meal cancelled"});
}catch(e){next(e)}});
export default router;
