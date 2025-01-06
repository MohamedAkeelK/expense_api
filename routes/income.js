import { Router } from "express";
import * as incomeController from "../controllers/income.js";
// import restrict from "../helpers/restrict.js";

const router = Router();

// Income routes

// router.get('/', incomeController.getIncomeAll);  // Get all incomes for the authenticated user
// router.get('/:id', incomeController.getIncome);  // Get a specific income by ID
// router.post('/', incomeController.createIncome); // Create a new income
// router.put('/:id', incomeController.updateIncome); // Update an income
// router.delete('/:id', incomeController.deleteIncome); // Delete an income

export default router;
