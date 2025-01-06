import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Expense = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    amount: { type: Number, required: true },
    categoryTags: {
      type: [String],
      enum: [
        "Food",
        "Transportation",
        "Bills",
        "Rent",
        "Entertainment",
        "Groceries",
        "Other",
      ],
    },
    description: String,
    paymentMethod: {
      type: String,
      enum: ["cash", "credit", "debit"],
    },
    isRecurring: { type: Boolean, default: false },
    recurringPeriod: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: null,
      validate: {
        validator: function () {
          return this.isRecurring ? this.recurringPeriod !== null : true;
        },
        message: "Recurring period must be set for recurring expenses.",
      },
    },
    notes: String,
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("expense", Expense);
