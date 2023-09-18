import { Router } from "express";
import {
  trackDeadline,
  getAll,
  markRead,
} from "../controllers/notification.controller";

const router = Router();

router.get("/", trackDeadline);
router.get("/all", getAll);
router.post("/:id", markRead);

export default router;
