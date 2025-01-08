import Expense from "../models/Expense.js";
// import restrict from "../helpers/restrict.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// export const getExpenseAll = async (req, res) => {
//   try {
//     const expenses = await Expense.find();
//     res.json(expenses);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

export const getExpensesByUser = async (req, res) => {
  try {
    console.log("Request Params:", req.params); // Log params to debug

    const { id } = req.params; // Using "id" directly
    console.log("Received User ID:", id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const expenses = await Expense.find({ userId: id }).sort({ date: -1 });
    console.log("Fetched Expenses:", expenses);

    if (expenses.length > 0) {
      return res.status(200).json(expenses);
    }

    res.status(404).json({ message: "No expenses found for this user!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request (JWT middleware must add `req.user`)

    // Add the userId to the expense data
    const expenseData = { ...req.body, userId };

    // Create and save the expense
    const expense = new Expense(expenseData);
    await expense.save();

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
