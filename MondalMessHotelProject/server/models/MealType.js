import mongoose from "mongoose";
const schema = new mongoose.Schema({ name: {type:String,required:true,trim:true}, description:String, currentPrice:{type:Number,required:true,min:0}, isActive:{type:Boolean,default:true} }, {timestamps:true});
schema.index({name:1},{unique:true});
export default mongoose.model("MealType",schema);
