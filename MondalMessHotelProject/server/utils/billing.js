import MealRecord from "../models/MealRecord.js";
import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";
import User from "../models/User.js";
const monthBounds=(month)=>{const [y,m]=month.split("-").map(Number);return {start:new Date(y,m-1,1),end:new Date(y,m,1)}};
export async function calculateBill(userId,month){
  if(!/^\d{4}-\d{2}$/.test(month)) throw new Error("Month must be YYYY-MM");
  const {start,end}=monthBounds(month);
  const meals=await MealRecord.find({userId,mealDate:{$gte:start,$lt:end},status:{$ne:"cancelled"}});
  const grouped={};
  for(const meal of meals){const key=meal.mealNameSnapshot;grouped[key]??={mealName:key,quantity:0,unitPrice:meal.mealPriceSnapshot,subtotal:0};grouped[key].quantity++;grouped[key].subtotal+=meal.mealPriceSnapshot;}
  const currentMonthBill=meals.reduce((s,m)=>s+m.mealPriceSnapshot,0);
  const payments=await Payment.find({userId,billingMonth:month,status:"valid"});
  const totalPaid=payments.reduce((s,p)=>s+p.amount,0);
  const totalAmountDue=currentMonthBill;
  const remainingBalance=totalAmountDue-totalPaid;
  const paymentStatus=remainingBalance<0?"Credit Balance":remainingBalance===0?"Paid":totalPaid>0?"Partially Paid":"Unpaid";
  return {mealBreakdown:Object.values(grouped),currentMonthBill,totalAmountDue,totalPaid,remainingBalance,paymentStatus};
}
export async function generateInvoice(userId,month){
  const user=await User.findById(userId); if(!user) throw new Error("User not found");
  const bill=await calculateBill(userId,month);
  return Invoice.findOneAndUpdate({userId,billingMonth:month},{
    invoiceNumber:`MMH-${month.replace("-","")}-${String(userId).slice(-6).toUpperCase()}`,
    userId,billingMonth:month,...bill,generatedAt:new Date()
  },{upsert:true,new:true,setDefaultsOnInsert:true});
}
