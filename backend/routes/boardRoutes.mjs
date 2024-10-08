import { Router } from "express";
import { createBoardController, deleteBoardController, getBoardsController, getSingleBoardController, updateBoardController } from "../controllers/boardControllers.mjs";

const router = Router()

router.get("/boards", getBoardsController)
router.post("/boards", createBoardController)
router.delete("/boards/:boardId", deleteBoardController)
router.delete("/boards/:boardId", getSingleBoardController)
router.put("/boards/:boardId", updateBoardController)

export default router