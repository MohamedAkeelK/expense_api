import { Router } from "express";
import * as incomeController from "../controllers/income.js";
import restrict from "../helpers/restrict.js";

const router = Router();

// Income routes

// router.get('/', incomeController.getIncomeAll);  // Get all incomes for the authenticated user
router.get("/:id", restrict, incomeController.getIncomesByUser); // Get a specific income by ID
router.post("/", restrict, incomeController.createIncome); // Create a new income
router.put("/:id", restrict, incomeController.updateIncome); // Update an income
router.delete("/:id", restrict, incomeController.deleteIncome); // Delete an income

export default router;
