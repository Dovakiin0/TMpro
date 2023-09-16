import { Router } from "express";
import {
  getAll,
  getMe,
  login,
  logout,
  registerUser,
} from "../controllers/user.controller";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.get("/", getAll);
router.get("/@me", isAuth, getMe);
router.post("/", login);
router.post("/register", registerUser);
router.post("/logout", isAuth, logout);

export default router;
