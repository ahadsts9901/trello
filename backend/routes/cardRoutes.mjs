import { Router } from "express";
import { createCardController, getCardsController } from "../controllers/cardControllers.mjs";

const router = Router()

router.get("/cards/:boardId/:columnId", getCardsController)
router.post("/cards", createCardController)

export default router