import { Router } from "express";
import { createColumnController, deleteColumnController, getColumnsController, updateColumnController } from "../controllers/columnControllers.mjs";

const router = Router()

router.get("/columns/:boardId", getColumnsController)
router.post("/columns", createColumnController)
router.delete("/columns/:boardId/:columnId", deleteColumnController)
router.put("/columns/:boardId/:columnId", updateColumnController)

export default router