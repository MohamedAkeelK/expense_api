import { Router } from "express";
import * as incomeController from "../controllers/incomes.js";
import restrict from "../helpers/restrict.js";

const router = Router();

// Income routes

router.get("/:id", restrict, incomeController.getIncomesByUser);
router.post("/", restrict, incomeController.createIncome);
router.put("/:id", restrict, incomeController.updateIncome);
router.delete("/:id", restrict, incomeController.deleteIncome);

export default router;
