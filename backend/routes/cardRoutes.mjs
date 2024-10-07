import { Router } from "express";
import { createCardController, deleteCardController, getCardsController, updateCardController } from "../controllers/cardControllers.mjs";

const router = Router()

router.get("/cards/:boardId/:columnId", getCardsController)
router.post("/cards", createCardController)
router.delete("/cards/:boardId/:columnId/:cardId", deleteCardController)
router.put("/cards/:boardId/:columnId/:cardId", updateCardController)

export default router