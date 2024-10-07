import { Router } from "express";
import { createBoardController, getBoardsController } from "../controllers/boardControllers.mjs";

const router = Router()

router.get("/boards", getBoardsController)
router.post("boards", createBoardController)

export default router