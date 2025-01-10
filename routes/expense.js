import { Router } from "express";
import * as expenseController from "../controllers/expense.js";
import restrict from "../helpers/restrict.js";

const router = Router();

// Expense routes

// router.get("/", expenseController.getExpenseAll); // Get all expenses for the authenticated user
router.get("/:id", restrict, expenseController.getExpensesByUser); // Get a single expense by ID
router.post("/", restrict, expenseController.createExpense); // Create a new expense
router.put("/:id", restrict, expenseController.updateExpense); // Update an expense
router.delete("/:id", restrict, expenseController.deleteExpense); // Delete an expense

export default router;
