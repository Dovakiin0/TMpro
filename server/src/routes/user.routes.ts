import { Router } from "express";
import { getAll, login, registerUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getAll);
router.post("/", login);
router.post("/register", registerUser);

export default router;
