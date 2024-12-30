import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Income = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    amount: { type: Number, required: true },
    source: {
      type: String,
      enum: ["Salary", "Investments", "Freelance", "Other"],
      required: true,
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
      default: null, // Null for one-time incomes
    },
    notes: String,
    status: {
      type: String,
      enum: ["recieved", "pending", "overdue"],
      default: "recieved",
    },
    date: { type: Date, default: Date.now },
    nextPaymentDate: {
      type: Date,
      validate: {
        validator: function () {
          return this.isRecurring ? this.nextPaymentDate !== null : true;
        },
        message: "Next payment date must be set for recurring incomes.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("income", Income);
