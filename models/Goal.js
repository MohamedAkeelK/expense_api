import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentProgress: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value <= this.targetAmount;
        },
        message: "Current progress cannot exceed target amount.",
      },
    },
    deadline: {
      type: Date,
      validate: {
        validator: function (value) {
          return value ? value > Date.now() : true;
        },
        message: "Deadline must be a future date.",
      },
    },
    category: {
      type: String,
      enum: [
        "Vacation",
        "Emergency Fund",
        "Education",
        "Car",
        "House/Apt",
        "Other",
      ],
      default: "Other",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("goal", GoalSchema);
