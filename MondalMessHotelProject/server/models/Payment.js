import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  billingMonth:{type:String,required:true,match:/^\d{4}-\d{2}$/},
  amount:{type:Number,required:true,min:0.01},
  paymentDate:{type:Date,default:Date.now},
  paymentMethod:{type:String,enum:["Cash","UPI","Bank Transfer","Other"],default:"Cash"},
  transactionReference:String,notes:String,
  status:{type:String,enum:["valid","reversed"],default:"valid"},
  recordedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true});
export default mongoose.model("Payment",schema);
