import { Router } from "express";
import expense from "./expense.js";
import user from "./user.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/user", user);
router.use("/expense", expense);

export default router;
