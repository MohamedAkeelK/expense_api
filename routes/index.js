import { Router } from "express";

import expenses from "./expenses.js";
import users from "./users.js";
import incomes from "./incomes.js";
import goals from "./goals.js";
import analytics from "./analytics.js";
// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "client/build"))); // adjust the path
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => res.send("This is the api root!"));

// All routes

router.use("/users", users);
router.use("/expenses", expenses);
router.use("/incomes", incomes);
router.use("/goals", goals);
router.use("/analytics", analytics);

// For any route not matching API, send index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

export default router;
