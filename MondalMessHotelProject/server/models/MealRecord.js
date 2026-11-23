import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  mealTypeId:{type:mongoose.Schema.Types.ObjectId,ref:"MealType",required:true},
  mealNameSnapshot:{type:String,required:true},
  mealPriceSnapshot:{type:Number,required:true,min:0},
  mealDate:{type:Date,required:true},
  status:{type:String,enum:["selected","served","cancelled"],default:"served"},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true});
schema.index({userId:1,mealTypeId:1,mealDate:1},{unique:true});
export default mongoose.model("MealRecord",schema);
