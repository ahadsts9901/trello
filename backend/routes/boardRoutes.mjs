import { Router } from "express";
import { createBoardController, deleteBoardController, getBoardsController } from "../controllers/boardControllers.mjs";

const router = Router()

router.get("/boards", getBoardsController)
router.post("/boards", createBoardController)
router.delete("/boards/:boardId", deleteBoardController)

export default router