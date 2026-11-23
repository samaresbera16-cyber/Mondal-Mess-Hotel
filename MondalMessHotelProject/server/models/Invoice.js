import mongoose from "mongoose";
const schema = new mongoose.Schema({
  invoiceNumber:{type:String,required:true,unique:true},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  billingMonth:{type:String,required:true},
  mealBreakdown:[{mealName:String,quantity:Number,unitPrice:Number,subtotal:Number}],
  previousBalance:{type:Number,default:0},
  currentMonthBill:{type:Number,required:true},
  totalAmountDue:{type:Number,required:true},
  totalPaid:{type:Number,required:true},
  remainingBalance:{type:Number,required:true},
  paymentStatus:{type:String,enum:["Paid","Partially Paid","Unpaid","Credit Balance"],required:true},
  generatedAt:{type:Date,default:Date.now}
},{timestamps:true});
schema.index({userId:1,billingMonth:1},{unique:true});
export default mongoose.model("Invoice",schema);
