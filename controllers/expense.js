import Expense from "../models/Expense.js";
// import restrict from "../helpers/restrict.js";
import User from "../models/User.js";

export const getExpenseAll = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (expense) {
      return res.json(expense);
    }
    res.status(404).json({ message: "Expense not found!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    // Check if a expense with the same name already exists
    // const existingExpense = await Expense.findOne({ name: req.body.name });
    // if (existingExpense) {
    //   return res
    //     .status(400)
    //     .json({ error: "Project with this name already exists" });
    // }

    // Create a new expense
    const expenseData = { ...req.body, userId: req.user.id };
    const expense = new Expense(expenseData);
    await expense.save();

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.Expenses.push(expense._id);
    await user.save();

    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
