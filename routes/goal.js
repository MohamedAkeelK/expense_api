import { Router } from "express";
import * as goalController from "../controllers/expense.js";
// import restrict from "../helpers/restrict.js";

const router = Router();

// Goal routes

// router.get("/", goalController.getGoalAll); // Get all goals for the authenticated user
// router.get("/:id", goalController.getGoal); // Get a specific goal by ID
// router.post("/", goalController.createGoal); // Create a new goal
// router.put("/:id", goalController.updateGoal); // Update a goal (e.g., progress)
// router.delete("/:id", goalController.deleteGoal); // Delete a goal

export default router;
