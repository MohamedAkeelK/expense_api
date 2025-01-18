import Expense from "../models/Expense.js";
import mongoose from "mongoose";
import User from "../models/User.js";

// Get all users expenses
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

// add a new expense
export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request (JWT middleware must add `req.user`)
    // Fetch the user's details
    const user = await User.findById(userId);

    // Add the userId to the expense data
    const expenseData = { ...req.body, userId };

    // Create and save the expense
    const expense = new Expense(expenseData);
    await expense.save();
    await User.findByIdAndUpdate(userId, {
      $inc: { totalMoney: -expense.amount },
    });

    res.status(201).json({
      user: {
        name: user.username, // Assuming the field for the user's name is `username`
        email: user.email,
        totalMoney: user.totalMoney,
      },
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { id } = req.params; // Expense ID from route params
    console.log(req.params, userId);
    // Find the expense by ID and check if it belongs to the logged-in user
    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      return res
        .status(404)
        .json({ error: "Expense not found or access denied" });
    }

    // Update the expense with the new data
    Object.assign(expense, req.body);
    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    console.error("Error updating expense:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { id } = req.params; // Expense ID from route params

    console.log(`Deleting expense with ID: ${id} for user: ${userId}`);

    // Find the expense by ID and check if it belongs to the logged-in user
    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!expense) {
      return res
        .status(404)
        .json({ error: "Expense not found or access denied" });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      expense, // Return the deleted expense if needed
    });
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    res.status(500).json({ error: error.message });
  }
};
