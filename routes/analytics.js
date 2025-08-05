import { Router } from "express";
import { getMonthlyAnalytics } from "../controllers/analytics.js";
import restrict from "../helpers/restrict.js";

const router = Router();

router.get("/monthly", restrict, getMonthlyAnalytics);

export default router;
