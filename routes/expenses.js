import { Router } from "express";
import * as expenseController from "../controllers/expenses.js";
import restrict from "../helpers/restrict.js";

const router = Router();

// Expense routes

router.get("/:id", restrict, expenseController.getExpensesByUser);
router.post("/", restrict, expenseController.createExpense);
router.put("/:id", restrict, expenseController.updateExpense);
router.delete("/:id", restrict, expenseController.deleteExpense);

export default router;
