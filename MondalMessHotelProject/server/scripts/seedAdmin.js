import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {connectDB} from "../config/db.js";
await connectDB();
const {ADMIN_NAME,ADMIN_PHONE,ADMIN_PASSWORD}=process.env;
if(!ADMIN_NAME||!ADMIN_PHONE||!ADMIN_PASSWORD){console.error("Set ADMIN_NAME, ADMIN_PHONE and ADMIN_PASSWORD in server/.env");process.exit(1);}
const hash=await bcrypt.hash(ADMIN_PASSWORD,12);
await User.findOneAndUpdate({mobile:ADMIN_PHONE},{$set:{name:ADMIN_NAME,mobile:ADMIN_PHONE,password:hash,role:"admin",accountStatus:"active"}},{upsert:true,new:true});
console.log("Admin initialized. Keep the password private.");
await mongoose.disconnect();
