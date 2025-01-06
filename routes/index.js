import { Router } from "express";

import expense from "./expense.js";
import user from "./user.js";
import income from "./income.js";
import goal from "./goal.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

// All routes

router.use("/user", user);
router.use("/expense", expense);
router.use("/income", income);
router.use("/goal", goal);

export default router;
