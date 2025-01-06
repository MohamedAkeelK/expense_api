import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true, select: false },
    profilePicture: { type: String },
    dob: { type: Date, default: null },
    totalMoney: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model("user", User);
