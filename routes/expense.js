import { Router } from "express";
import * as controllers from "../controllers/expense.js";
// import restrict from "../helpers/restrict.js";

const router = Router();

router.post("/all", controllers.getExpenseAll);

router.get("/:id", controllers.getExpense);
// router.post("/", restrict, controllers.createProject);
// router.put("/:id", restrict, controllers.updateProject);
// router.delete("/:id", restrict, controllers.deleteProject);

export default router;
