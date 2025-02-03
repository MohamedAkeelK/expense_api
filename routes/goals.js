import { Router } from "express";
import * as goalController from "../controllers/goals.js";
import restrict from "../helpers/restrict.js";

const router = Router();

// Goal routes

router.get("/:id", restrict, goalController.getGoalsByUser);
router.post("/", restrict, goalController.createGoal);
router.put("/:id", restrict, goalController.updateGoal);
router.delete("/:id", restrict, goalController.deleteGoal);

export default router;
