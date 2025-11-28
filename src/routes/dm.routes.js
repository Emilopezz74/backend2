import { Router } from "express";
import DMController from "../controllers/DMController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:workspace_id/dm/:member_id/messages", authMiddleware, DMController.getAll);
router.post("/:workspace_id/dm/:member_id/messages", authMiddleware, DMController.create);

export default router;
