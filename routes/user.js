import { Router } from "express";
import * as userController from "../controllers/user.js";
import restrict from "../helpers/restrict.js";
const router = Router();

// User routes

router.get("/", (req, res) => {
  res.send("users home get route");
});
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.get("/verify", userController.verify);
router.get("/:id", restrict, userController.getUserProfile); // Get user profile
// router.put("/:id", userController.updateProfile); // Update user profile
// router.delete("/:id", userController.deleteUser); // Delete user

export default router;
