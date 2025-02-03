import Income from "../models/Income.js";
import mongoose from "mongoose";

// Get all incomes for a user
import User from "../models/User.js"; // Import the User model

export const getIncomesByUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from the request params

    console.log("Received User ID for Incomes:", id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    // Fetch the user's details
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Fetch incomes for the user
    const incomes = await Income.find({ userId: id }).sort({ date: -1 });

    console.log("Fetched Incomes:", incomes);

    if (incomes.length > 0) {
      return res.status(200).json({
        user: {
          name: user.username, // Assuming the field for the user's name is `username`
          email: user.email,
          totalMoney: user.totalMoney,
        },
        incomes,
      });
    }

    res.status(404).json({ message: "No incomes found for this user!" });
  } catch (error) {
    console.error("Error fetching incomes:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Create a new income
export const createIncome = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request (JWT middleware must add `req.user`)

    // Add the userId to the income data
    const incomeData = { ...req.body, userId };

    // Create and save the income
    const income = new Income(incomeData);
    await income.save();

    res.status(201).json({
      message: "Income created successfully",
      income,
    });
  } catch (error) {
    console.error("Error creating income:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update an income
export const updateIncome = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { id } = req.params; // Income ID from route params

    console.log(req.params, userId);

    // Find the income by ID and check if it belongs to the logged-in user
    const income = await Income.findOne({ _id: id, userId });

    if (!income) {
      return res
        .status(404)
        .json({ error: "Income not found or access denied" });
    }

    // Update the income with the new data
    Object.assign(income, req.body);
    await income.save();

    res.status(200).json({
      message: "Income updated successfully",
      income,
    });
  } catch (error) {
    console.error("Error updating income:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete an income
export const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { id } = req.params; // Income ID from route params

    console.log(`Deleting income with ID: ${id} for user: ${userId}`);

    // Find the income by ID and check if it belongs to the logged-in user
    const income = await Income.findOneAndDelete({ _id: id, userId });

    if (!income) {
      return res
        .status(404)
        .json({ error: "Income not found or access denied" });
    }

    res.status(200).json({
      message: "Income deleted successfully",
      income, // Return the deleted income if needed
    });
  } catch (error) {
    console.error("Error deleting income:", error.message);
    res.status(500).json({ error: error.message });
  }
};
