import "dotenv/config";
import app from "./app.js";
import {connectDB} from "./config/db.js";
import MealType from "./models/MealType.js";
const PORT=process.env.PORT||5000;
await connectDB();
for(const [name,currentPrice] of [["Breakfast",20],["Lunch",40],["Dinner",40],["Special Meal",60]]){
 await MealType.updateOne({name},{$setOnInsert:{name,currentPrice,isActive:true}},{upsert:true});
}
app.listen(PORT,()=>console.log(`API running on port ${PORT}`));
