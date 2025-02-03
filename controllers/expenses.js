import Expense from "../models/Expense.js";
import mongoose from "mongoose";
import User from "../models/User.js";

// Get all users expenses
export const getExpensesByUser = async (req, res) => {
  try {
    const { id } = req.params; // Using "id" directly
    const userId = req.user.id; // Extract user ID from authenticated request (JWT middleware must add `req.user`)

    // Fetch the user's details
    const user = await User.findById(userId);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const expenses = await Expense.find({ userId: id }).sort({ date: -1 });
    console.log("Fetched Expenses:", expenses);

    if (expenses.length > 0) {
      return res.status(200).json({
        user: {
          name: user.username,
          email: user.email,
          totalMoney: user.totalMoney,
        },
        expenses,
      });
    }

    res.status(404).json({ message: "No expenses found for this user!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // Add the userId to the expense data
    const expenseData = { ...req.body, userId };

    // Make sure the recurringPeriod is set correctly if isRecurring is true
    if (expenseData.isRecurring && !expenseData.recurringPeriod) {
      return res
        .status(400)
        .json({ error: "Recurring period is required for recurring expenses" });
    }

    // Create and save the expense
    const expense = new Expense(expenseData);
    await expense.save();

    // Update the user's total money
    await User.findByIdAndUpdate(userId, {
      $inc: { totalMoney: -expense.amount },
    });

    res.status(201).json({
      user: {
        name: user.username,
        email: user.email,
        totalMoney: user.totalMoney - expense.amount, // Subtract the expense amount from totalMoney
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
    const user = await User.findById(userId);

    // Find the expense by ID and check if it belongs to the logged-in user
    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      return res
        .status(404)
        .json({ error: "Expense not found or access denied" });
    }

    // Calculate the difference between the old and new amounts
    const oldAmount = expense.amount;
    const newAmount = req.body.amount || oldAmount; // Use the old amount if no new amount is provided
    const amountDifference = newAmount - oldAmount;

    // Update the user's total money
    await User.findByIdAndUpdate(userId, {
      $inc: { totalMoney: -amountDifference }, // Subtract the difference
    });

    // Update the expense with the new data
    Object.assign(expense, req.body);
    await expense.save();

    res.status(200).json({
      user: {
        name: user.username,
        email: user.email,
        totalMoney: user.totalMoney - amountDifference, // Return updated totalMoney
      },
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
