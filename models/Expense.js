import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit", "debit", "paypal"],
    },
    isRecurring: { type: Boolean, default: false },
    recurringPeriod: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    receiptUrl: String,
    categoryTags: [String],
    notes: String,
    location: { latitude: Number, longitude: Number },
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["paid", "pending", "overdue"] },
  },
  { timestamps: true }
);

export default mongoose.model("expenses", ExpenseSchema);
