import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true, select: false },
    profilePicture: { type: String },
    dob: Date,
    language: String,
    accountType: { type: String, enum: ["basic", "premium", "admin"] },
    subscriptionPlan: String,
    budget: { type: Number, default: 0 },
    allExpenses: [{ type: Schema.Types.ObjectId, ref: "expenses" }],
  },
  { timestamps: true }
);
export default mongoose.model("users", UserSchema);
