import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  roomNumber: { type: String, default: "" },
  accountStatus: { type: String, enum: ["pending", "active", "inactive"], default: "active" }
}, { timestamps: true });
export default mongoose.model("User", userSchema);
