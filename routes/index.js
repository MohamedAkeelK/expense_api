import { Router } from "express";

import expenses from "./expenses.js";
import users from "./users.js";
import incomes from "./incomes.js";
import goals from "./goals.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

// All routes

router.use("/users", users);
router.use("/expenses", expenses);
router.use("/incomes", incomes);
router.use("/goals", goals);

export default router;
