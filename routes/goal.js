import { Router } from "express";
import * as goalController from "../controllers/goal.js";
// import restrict from "../helpers/restrict.js";

const router = Router();

// Goal routes

router.get("/:id", goalController.getGoalsByUser); // Get a specific goal by ID
router.post("/", goalController.createGoal); // Create a new goal
router.put("/:id", goalController.updateGoal); // Update a goal (e.g., progress)
router.delete("/:id", goalController.deleteGoal); // Delete a goal

export default router;
