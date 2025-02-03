import { Router } from "express";
import * as userController from "../controllers/users.js";
import restrict from "../helpers/restrict.js";
const router = Router();

// User routes

router.get("/", (req, res) => {
  res.send("users home get route");
});
router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/verify", userController.verify);
router.get("/profile", restrict, userController.getUserProfile);
// router.put("/:id", userController.updateProfile); // Update user profile
// router.delete("/:id", userController.deleteUser); // Delete user

export default router;
