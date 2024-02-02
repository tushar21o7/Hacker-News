import { Router } from "express";
const router = Router();

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

router
  .route("/register")
  .post(registerUser)
  .get((res) => res.send("register"));

router
  .route("/login")
  .post(loginUser)
  .get((res) => res.send("login"));

router.route("/logout").all(logoutUser);

export default router;
